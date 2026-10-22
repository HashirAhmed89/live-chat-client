import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/auth_Context";
import { useConversation } from "../conversation_Context/conversationcontext";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../sockets/socket";
import ChatHeader from "../components/chat/ChatHeader"
import MessageEditor from "./chat/MessageEditor";
import MessageItem from "./chat/MessageItem";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const getConversationMessages = (conversation) => {
  if (Array.isArray(conversation?.messages)) return conversation.messages;
  if (conversation?.message) return [conversation.message];
  return [];
};

const getMessagesFromResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  const messages =
    data?.messages ??
    data?.conversation?.messages ??
    data?.data?.messages ??
    data?.data?.conversation?.messages ??
    data?.result?.messages;

  if (Array.isArray(messages)) return messages;

  const message =
    data?.message ??
    data?.conversation?.message ??
    data?.data?.message ??
    data?.data?.conversation?.message;

  return message ? [message] : [];
};

const unwrapResponseData = (data) =>
  data?.data && typeof data.data === "object" ? data.data : data;

const unwrapEventData = (event) => {
  let data = event;

  for (let depth = 0; depth < 2; depth += 1) {
    if (!data?.data || typeof data.data !== "object") break;
    data = data.data;
  }

  return data;
};

const normalizeId = (value) => {
  if (value == null) return "";
  return String(value?._id ?? value?.id ?? value);
};

const getMessageKey = (message) => {
  if (message == null) return String(message);
  if (typeof message !== "object") return `${typeof message}:${message}`;

  const messageId = message._id ?? message.id ?? message.messageId;
  if (messageId != null) return `id:${normalizeId(messageId)}`;

  // Use the saved message contents when the API does not provide an ID.
  return `message:${JSON.stringify(message)}`;
};

const mergeMessages = (existingMessages, incomingMessages) => {
  const messages = [];
  const seenMessageKeys = new Set();

  // Keep every previously loaded message and append only new messages.
  [...existingMessages, ...incomingMessages].forEach((message) => {
    const key = getMessageKey(message);
    if (seenMessageKeys.has(key)) return;

    seenMessageKeys.add(key);
    messages.push(message);
  });

  return messages;
};

const isAgentMessage = (message) => {
  if (!message || typeof message !== "object") return false;

  // Explicit flags take priority over the sender's role.
  if (typeof message.isAgent === "boolean") return message.isAgent;
  if (message.isCustomer === true) return false;

  // Messages may store the sender role in different fields depending on the API response.
  const sender = message.sender;
  let role = message.senderType ?? message.senderRole ?? message.role;

  if (role == null) {
    const senderId = message.senderId;
    const senderDetails =
      typeof sender === "object" && sender !== null
        ? sender
        : typeof senderId === "object" && senderId !== null
          ? senderId
          : null;

    if (typeof sender === "string") {
      role = sender;
    } else {
      role = senderDetails?.role ?? senderDetails?.type;
    }
  }

  if (role == null) role = message.direction;
  if (typeof role !== "string") return false;

  const normalizedRole = role.trim().toLowerCase();
  return normalizedRole === "agent" || normalizedRole === "admin";
};

const ChatWindow = ({
  selectedConversation: selectedConversationProp,
  onConversationData,
}) => {
  const conversationContext = useConversation();
  const navigate = useNavigate();
  const { id: routeConversationId } = useParams();

  // Use the conversation passed by the list, or fall back to shared context.
  const selectedConversation =
    selectedConversationProp ?? conversationContext?.selectedConversation;
  const selectedConversationId = normalizeId(
    routeConversationId ??
      selectedConversation?._id ??
      selectedConversation?.id,
  );
  const conversationMessages = useMemo(
    () => getConversationMessages(selectedConversation),
    [selectedConversation],
  );
  const { token, user } = useAuth();
  const [messageState, setMessageState] = useState(() => ({
    conversationId: selectedConversationId,
    messages: conversationMessages,
  }));
  const [historyState, setHistoryState] = useState({
    conversationId: "",
    loading: false,
    error: "",
  });
  const [conversationDetails, setConversationDetails] = useState({
    conversationId: "",
    customer: null,
    agent: null,
  });

  useEffect(() => {
    if (!selectedConversationId) return undefined;
    if (!token) return undefined;

    const controller = new AbortController();

    const fetchMessages = async () => {
      console.info("Loading conversation messages from the API.", {
        conversationId: selectedConversationId,
      });

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/messages?conversationId=${encodeURIComponent(selectedConversationId)}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": token,
            },
            signal: controller.signal,
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load conversation messages.");
        }

        const responseData = unwrapResponseData(data);
        const loadedMessages = getMessagesFromResponse(data);
        if (
          !Array.isArray(data) &&
          !Array.isArray(data?.data) &&
          !Array.isArray(data?.messages) &&
          !Array.isArray(data?.conversation?.messages) &&
          !Array.isArray(data?.data?.messages) &&
          !Array.isArray(data?.data?.conversation?.messages) &&
          !Array.isArray(data?.result?.messages) &&
          !data?.message &&
          !data?.conversation?.message &&
          !data?.data?.message &&
          !data?.data?.conversation?.message
        ) {
          throw new Error(
            "The conversation API response did not contain a messages array.",
          );
        }

        console.info("Conversation messages loaded from the API.", {
          conversationId: selectedConversationId,
          count: loadedMessages.length,
          customerName:
            responseData?.customer?.name ??
            responseData?.conversation?.customer?.name ??
            responseData?.conversation?.customerId?.name ??
            null,
        });

        const customer =
          responseData?.customer ??
          responseData?.conversation?.customer ??
          (typeof responseData?.conversation?.customerId === "object"
            ? responseData.conversation.customerId
            : null);
        const agent =
          responseData?.agent ??
          responseData?.conversation?.assignedAgent ??
          responseData?.conversation?.agent ??
          responseData?.conversation?.assignedAgentId ??
          null;
        setConversationDetails({
          conversationId: selectedConversationId,
          customer,
          agent,
        });
        onConversationData?.(selectedConversationId, { customer, agent });

        setMessageState((previous) => ({
          conversationId: selectedConversationId,
          messages: mergeMessages(
            loadedMessages,
            previous.conversationId === selectedConversationId
              ? previous.messages
              : [],
          ),
        }));
        setHistoryState({
          conversationId: selectedConversationId,
          loading: false,
          error: "",
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load conversation messages.", {
            conversationId: selectedConversationId,
            error,
          });
          setHistoryState({
            conversationId: selectedConversationId,
            loading: false,
            error: error.message || "Failed to load conversation messages.",
          });
        }
      }
    };

    fetchMessages();

    return () => controller.abort();
  }, [onConversationData, selectedConversationId, token]);

  // Listen on the shared socket and clean up this listener when the chat changes.
  useEffect(() => {
    const socket = getSocket();
    if (!selectedConversationId) return undefined;
    if (!socket) {
      console.warn("Cannot receive chat messages: Socket.IO is not initialized.");
      return undefined;
    }

    const handleNewMessage = (event) => {
      const payload = unwrapEventData(event);
      console.info("Received new_message event in ChatWindow.", payload);
      const incomingMessage =
        payload?.message ??
        payload?.savedMessage ??
        payload?.conversation?.messages?.at(-1) ??
        (payload?.conversationId != null || payload?.conversation_id != null
          ? payload
          : null);
      const eventConversationId =
        payload?.conversationId ??
        payload?.conversation_id ??
        payload?.conversation?.conversationId ??
        payload?.conversation?._id ??
        payload?.conversation?.id ??
        incomingMessage?.conversationId ??
        incomingMessage?.conversation_id;

      // Only add messages that belong to the currently selected conversation.
      if (
        !incomingMessage ||
        normalizeId(eventConversationId) !== selectedConversationId
      ) {
        console.debug("Ignoring new_message event for another conversation.", {
          selectedConversationId,
          eventConversationId: normalizeId(eventConversationId),
          matches: normalizeId(eventConversationId) === selectedConversationId,
        });
        return;
      }

      console.info("Received a new message for the selected conversation.", {
        conversationId: selectedConversationId,
        messageId: normalizeId(
          incomingMessage?._id ?? incomingMessage?.id ?? incomingMessage?.messageId,
        ),
      });

      const eventCustomer =
        payload?.customer ??
        payload?.conversation?.customer ??
        (typeof payload?.conversation?.customerId === "object"
          ? payload.conversation.customerId
          : null);
      const eventAgent =
        payload?.agent ??
        payload?.conversation?.assignedAgent ??
        payload?.conversation?.agent ??
        null;
      if (eventCustomer || eventAgent) {
        setConversationDetails((previous) => ({
          conversationId: selectedConversationId,
          customer:
            eventCustomer ||
            (previous.conversationId === selectedConversationId
              ? previous.customer
              : null),
          agent:
            eventAgent ||
            (previous.conversationId === selectedConversationId
              ? previous.agent
              : null),
        }));
      }
      onConversationData?.(selectedConversationId, {
        customer: eventCustomer,
        agent: eventAgent,
      });

      setMessageState((previous) => {
        const sameConversation =
          previous.conversationId === selectedConversationId;
        const messages = mergeMessages(
          sameConversation
            ? mergeMessages(conversationMessages, previous.messages)
            : conversationMessages,
          [incomingMessage],
        );
        console.info("Added incoming message to ChatWindow state.", {
          conversationId: selectedConversationId,
          messageId: normalizeId(
            incomingMessage?._id ??
              incomingMessage?.id ??
              incomingMessage?.messageId,
          ),
          messageCount: messages.length,
        });

        return {
          conversationId: selectedConversationId,
          messages,
        };
      });
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [conversationMessages, onConversationData, selectedConversationId]);

  // Combine loaded history with live messages without resetting either source.
  const messages =
    messageState.conversationId === selectedConversationId
      ? mergeMessages(conversationMessages, messageState.messages)
      : conversationMessages;
  const historyStateMatchesConversation =
    historyState.conversationId === selectedConversationId;
  const historyLoading =
    Boolean(selectedConversationId) &&
    Boolean(token) &&
    (!historyStateMatchesConversation || historyState.loading);
  const historyError = historyStateMatchesConversation
    ? historyState.error
    : token
      ? ""
      : "Your session is unavailable. Please log in again.";
  const loadedConversationDetails =
    conversationDetails.conversationId === selectedConversationId
      ? conversationDetails
      : {};
  const customer =
    loadedConversationDetails.customer ??
    selectedConversation?.customer ??
    (typeof selectedConversation?.customerId === "object"
      ? selectedConversation.customerId
      : null);
  const agent =
    loadedConversationDetails.agent ??
    selectedConversation?.assignedAgent ??
    selectedConversation?.agent ??
    (typeof selectedConversation?.agentId === "object"
      ? selectedConversation.agentId
      : null);
  const customerId =
    customer?._id ??
    customer?.id ??
    selectedConversation?.customerId?._id ??
    selectedConversation?.customerId?.id ??
    selectedConversation?.customerId;
  const agentId =
    agent?._id ??
    agent?.id ??
    selectedConversation?.agentId?._id ??
    selectedConversation?.agentId?.id ??
    selectedConversation?.agentId ??
    user?._id ??
    user?.id ??
    user?.userId;
  const customerName =
    customer?.name ??
    customer?.fullName ??
    customer?.displayName ??
    selectedConversation?.customerName ??
    selectedConversation?.name;
  const agentName =
    agent?.name ??
    agent?.fullName ??
    agent?.displayName ??
    selectedConversation?.agentName ??
    user?.name ??
    user?.fullName ??
    user?.displayName;

  useEffect(() => {
    console.info("Selected conversation details for ChatHeader.", {
      conversationId: selectedConversationId,
      customerName: customerName || null,
    });
  }, [customerName, selectedConversationId]);

  return (
    <section className="content-area conversation-chat-window">
      <ChatHeader
        name={
          customerName ||
          (selectedConversationId ? "Customer name unavailable" : "Select a conversation")
        }
        avatar={selectedConversation?.avatar}
        onBack={() => navigate("/conversations")}
      />
      <div className="content-area-body conversation-messages">
        {/* Show an empty-state message when there are no messages to display. */}
        {messages.length === 0 ? (
          <div className="conversation-empty-state">
            {historyLoading
              ? "Loading messages..."
              : historyError
                ? historyError
                : selectedConversationId
                  ? "No messages yet."
                  : "Select a conversation to view messages."}
          </div>
        ) : (
          messages.map((message, index) => {
            const isAgent = isAgentMessage(message);

            return (
              <MessageItem
                key={`${selectedConversationId || "conversation"}-${getMessageKey(message) || index}`}
                message={message}
                customerName={customerName}
                customerId={customerId}
                agentName={agentName}
                agentId={agentId}
                avatar={
                  isAgent ? undefined : selectedConversation?.avatar
                }
                isAgent={isAgent}
              />
            );
          })
        )}
      </div>
      <MessageEditor />
    </section>
  );
};

export default ChatWindow;
