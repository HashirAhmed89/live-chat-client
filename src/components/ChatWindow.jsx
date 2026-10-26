import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/auth_Context";
import { useConversation } from "../conversation_Context/conversationcontext";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../sockets/socket";
import ChatHeader from "../components/chat/ChatHeader";
import MessageEditor from "./chat/MessageEditor";
import MessageItem from "./chat/MessageItem";
import {
  getId,
  getMessages,
  unwrapData,
  unwrapEvent,
  getMessageKey,
  mergeMessages,
  isAgentMessage,
} from "./utils/chatWindow.utils";
import {
  fetchConversationMessages,
  postAgentReply,
} from "./services/chatWindow.service";

const ChatWindow = ({ selectedConversation: conversationProp, onConversationData }) => {
  const { token, user } = useAuth();
  const conversationContext = useConversation();
  const navigate = useNavigate();
  const { id: routeConversationId } = useParams();

  // Use the selected conversation from props, or shared context.
  const selectedConversation =
    conversationProp ?? conversationContext?.selectedConversation;

  const conversationId = getId(
    routeConversationId ?? selectedConversation?._id ?? selectedConversation?.id
  );

  const initialMessages = useMemo(() => {
    if (Array.isArray(selectedConversation?.messages)) {
      return selectedConversation.messages;
    }
    return selectedConversation?.message ? [selectedConversation.message] : [];
  }, [selectedConversation]);

  const [messageState, setMessageState] = useState({
    conversationId,
    messages: initialMessages,
  });
  const [historyState, setHistoryState] = useState({
    conversationId: "",
    loading: false,
    error: "",
  });
  const [details, setDetails] = useState({
    conversationId: "",
    customer: null,
    agent: null,
  });
  const [replyDraft, setReplyDraft] = useState({
    conversationId,
    content: "",
    error: "",
  });
  const [replySending, setReplySending] = useState(false);

  const replyContent =
    replyDraft.conversationId === conversationId ? replyDraft.content : "";
  const replyError =
    replyDraft.conversationId === conversationId ? replyDraft.error : "";

  // Load the conversation's message history from the backend.
  useEffect(() => {
    if (!conversationId || !token) return undefined;

    const controller = new AbortController();

    const loadMessages = async () => {
      setHistoryState({ conversationId, loading: true, error: "" });

      try {
        const data = await fetchConversationMessages({
          conversationId,
          token,
          signal: controller.signal,
        });

        const responseData = unwrapData(data);
        const loadedMessages = getMessages(data);

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
          throw new Error("The conversation API response did not contain messages.");
        }

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

        setDetails({ conversationId, customer, agent });
        onConversationData?.(conversationId, { customer, agent });

        // Merge API history with messages already received from Socket.IO.
        setMessageState((previous) => ({
          conversationId,
          messages: mergeMessages(
            loadedMessages,
            previous.conversationId === conversationId ? previous.messages : []
          ),
        }));

        setHistoryState({ conversationId, loading: false, error: "" });
      } catch (error) {
        if (error.name !== "AbortError") {
          setHistoryState({
            conversationId,
            loading: false,
            error: error.message || "Failed to load conversation messages.",
          });
        }
      }
    };

    loadMessages();
    return () => controller.abort();
  }, [conversationId, token, onConversationData]);

  // Listen for real-time messages from Socket.IO.
  useEffect(() => {
    if (!conversationId) return undefined;

    const socket = getSocket();
    if (!socket) return undefined;

    const handleNewMessage = (event) => {
      const payload = unwrapEvent(event);
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

      // Ignore events for a different conversation.
      if (!incomingMessage || getId(eventConversationId) !== conversationId) return;

      const customer =
        payload?.customer ??
        payload?.conversation?.customer ??
        (typeof payload?.conversation?.customerId === "object"
          ? payload.conversation.customerId
          : null);

      const agent =
        payload?.agent ??
        payload?.conversation?.assignedAgent ??
        payload?.conversation?.agent ??
        null;

      if (customer || agent) {
        setDetails((previous) => ({
          conversationId,
          customer:
            customer ||
            (previous.conversationId === conversationId ? previous.customer : null),
          agent:
            agent ||
            (previous.conversationId === conversationId ? previous.agent : null),
        }));
      }

      onConversationData?.(conversationId, { customer, agent });

      setMessageState((previous) => ({
        conversationId,
        messages: mergeMessages(
          previous.conversationId === conversationId
            ? previous.messages
            : initialMessages,
          [incomingMessage]
        ),
      }));
    };

    socket.on("new_message", handleNewMessage);
    return () => socket.off("new_message", handleNewMessage);
  }, [conversationId, initialMessages, onConversationData]);

  // Combine conversation messages with API and live messages.
  const messages =
    messageState.conversationId === conversationId
      ? mergeMessages(initialMessages, messageState.messages)
      : initialMessages;

  const historyMatches = historyState.conversationId === conversationId;
  const historyLoading =
    Boolean(conversationId) &&
    Boolean(token) &&
    (!historyMatches || historyState.loading);
  const historyError = historyMatches
    ? historyState.error
    : token
      ? ""
      : "Your session is unavailable. Please log in again.";

  const loadedDetails =
    details.conversationId === conversationId ? details : {};

  const customer =
    loadedDetails.customer ??
    selectedConversation?.customer ??
    (typeof selectedConversation?.customerId === "object"
      ? selectedConversation.customerId
      : null);

  const agent =
    loadedDetails.agent ??
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

  // Send a reply to the selected conversation.
  const sendReply = async (event) => {
    event.preventDefault();

    const content = replyContent.trim();
    if (!content || !conversationId || !token || replySending) return;

    setReplySending(true);
    setReplyDraft({ conversationId, content: replyContent, error: "" });

    try {
      const savedMessage = await postAgentReply({
        conversationId,
        content,
        token,
      });

      // Add the saved message immediately; the socket event may also arrive.
      setMessageState((previous) => ({
        conversationId,
        messages: mergeMessages(
          previous.conversationId === conversationId
            ? previous.messages
            : initialMessages,
          [savedMessage]
        ),
      }));

      setReplyDraft({ conversationId, content: "", error: "" });
    } catch (error) {
      setReplyDraft({
        conversationId,
        content: replyContent,
        error: error.message || "Failed to send reply.",
      });
    } finally {
      setReplySending(false);
    }
  };

  return (
    <section className="content-area conversation-chat-window">
      <ChatHeader
        name={
          customerName ||
          (conversationId ? "Customer name unavailable" : "Select a conversation")
        }
        avatar={selectedConversation?.avatar}
        onBack={() => navigate("/conversations")}
      />

      <div className="content-area-body conversation-messages">
        {messages.length === 0 ? (
          <div className="conversation-empty-state">
            {historyLoading
              ? "Loading messages..."
              : historyError
                ? historyError
                : conversationId
                  ? "No messages yet."
                  : "Select a conversation to view messages."}
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageItem
              key={`${conversationId || "conversation"}-${getMessageKey(message) || index}`}
              message={message}
              customerName={customerName}
              customerId={customerId}
              agentName={agentName}
              agentId={agentId}
              avatar={isAgentMessage(message) ? undefined : selectedConversation?.avatar}
              isAgent={isAgentMessage(message)}
            />
          ))
        )}
      </div>

      <MessageEditor
        value={replyContent}
        onChange={(event) =>
          setReplyDraft({
            conversationId,
            content: event.target.value,
            error: "",
          })
        }
        onSubmit={sendReply}
        disabled={!conversationId || !token}
        sending={replySending}
        error={replyError}
      />
    </section>
  );
};

export default ChatWindow;
