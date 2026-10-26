import { useEffect, useState } from "react";
import MessageEditor from "../components/chat/MessageEditor";
import MessageItem from "../components/chat/MessageItem";
import {
  connectCustomerSocket,
  disconnectCustomerSocket,
} from "../sockets/socket";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const getVisitorId = () => {
  const storedVisitorId = sessionStorage.getItem("customerVisitorId");
  if (storedVisitorId) return storedVisitorId;

  const visitorId = crypto.randomUUID();
  sessionStorage.setItem("customerVisitorId", visitorId);
  return visitorId;
};

const normalizeId = (value) => {
  if (value == null) return "";
  return String(value?._id ?? value?.id ?? value);
};

const mergeMessages = (current, incoming) => {
  const byId = new Map();
  [...current, ...incoming].forEach((message, index) => {
    const id = normalizeId(message?._id ?? message?.id ?? message?.messageId);
    byId.set(id || `message-${index}-${JSON.stringify(message)}`, message);
  });
  return [...byId.values()].sort(
    (left, right) =>
      new Date(left.createdAt || 0).getTime() -
      new Date(right.createdAt || 0).getTime(),
  );
};

const CustomerChat = () => {
  const [visitorId] = useState(getVisitorId);
  const [customerToken, setCustomerToken] = useState(
    () => sessionStorage.getItem("customerChatToken") || "",
  );
  const [conversationId, setConversationId] = useState(
    () => sessionStorage.getItem("customerConversationId") || "",
  );
  const [customerName, setCustomerName] = useState(
    () => sessionStorage.getItem("customerChatName") || "",
  );
  const [email, setEmail] = useState(
    () => sessionStorage.getItem("customerChatEmail") || "",
  );
  const [agentName, setAgentName] = useState("Support");
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerToken || !conversationId) return undefined;

    const controller = new AbortController();
    const socket = connectCustomerSocket(customerToken);
    const handleNewMessage = (event) => {
      const payload = event?.data ?? event;
      const message = payload?.message ?? payload?.savedMessage;
      const eventConversationId = normalizeId(
        payload?.conversation?._id ??
          payload?.conversation?.id ??
          payload?.conversationId ??
          message?.conversationId,
      );

      if (!message || eventConversationId !== conversationId) return;
      setMessages((current) => mergeMessages(current, [message]));
      const assignedAgent =
        payload?.conversation?.assignedAgentId ?? payload?.agent;
      const assignedAgentName =
        typeof assignedAgent === "object"
          ? assignedAgent?.name
          : payload?.agent?.name;
      if (assignedAgentName) setAgentName(assignedAgentName);
    };

    socket.on("new_message", handleNewMessage);

    const loadHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/messages?conversationId=${encodeURIComponent(conversationId)}`,
          {
            headers: { "x-api-key": customerToken },
            signal: controller.signal,
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "Failed to load chat history.");
        }

        setMessages((current) =>
          mergeMessages(current, Array.isArray(data?.messages) ? data.messages : []),
        );
        const assignedAgent = data?.conversation?.assignedAgentId;
        if (assignedAgent?.name) setAgentName(assignedAgent.name);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Failed to load customer chat history.", loadError);
          setError(loadError.message || "Failed to load chat history.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadHistory();

    return () => {
      controller.abort();
      socket.off("new_message", handleNewMessage);
      disconnectCustomerSocket(socket);
    };
  }, [conversationId, customerToken]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent || sending) return;
    if (!customerToken && (!customerName.trim() || !email.trim())) {
      setError("Enter your name and email to start the chat.");
      return;
    }

    setSending(true);
    setError("");
    try {
      const existingSession = Boolean(customerToken && conversationId);
      const response = await fetch(
        existingSession
          ? `${API_BASE_URL}/api/messages/reply`
          : `${API_BASE_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(existingSession ? { "x-api-key": customerToken } : {}),
          },
          body: JSON.stringify(
            existingSession
              ? { conversationId, content: trimmedContent }
              : {
                  visitorId,
                  name: customerName.trim(),
                  email: email.trim(),
                  content: trimmedContent,
                },
          ),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to send your message.");
      }

      const savedMessage = data?.data?.message;
      if (!savedMessage) {
        throw new Error("The server did not return the saved message.");
      }

      setMessages((current) => mergeMessages(current, [savedMessage]));
      setContent("");

      if (!existingSession) {
        const newConversationId = normalizeId(data?.data?.conversation);
        const newCustomerToken = data?.customerSocketToken;
        if (!newConversationId || !newCustomerToken) {
          throw new Error(
            "The message was saved, but a secure customer chat session could not be started.",
          );
        }

        sessionStorage.setItem("customerConversationId", newConversationId);
        sessionStorage.setItem("customerChatToken", newCustomerToken);
        sessionStorage.setItem("customerChatName", customerName.trim());
        sessionStorage.setItem("customerChatEmail", email.trim());
        setConversationId(newConversationId);
        setCustomerToken(newCustomerToken);
      }
    } catch (sendError) {
      console.error("Failed to send customer chat message.", sendError);
      setError(sendError.message || "Failed to send your message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="nxl-container apps-container apps-chat">
      <section className="content-area conversation-chat-window">
        <header className="content-area-header conversation-chat-header">
          <div className="conversation-chat-person-details">
            <h2 className="conversation-chat-name">Customer support</h2>
            <span className="conversation-chat-status">{agentName}</span>
          </div>
        </header>

        {!customerToken && (
          <div className="px-4 pt-3">
            <label className="form-label" htmlFor="customer-chat-name">
              Your name
            </label>
            <input
              id="customer-chat-name"
              className="form-control mb-3"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              autoComplete="name"
              required
            />
            <label className="form-label" htmlFor="customer-chat-email">
              Email
            </label>
            <input
              id="customer-chat-email"
              className="form-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>
        )}

        <div className="content-area-body conversation-messages">
          {loading && messages.length === 0 ? (
            <div className="conversation-empty-state">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="conversation-empty-state">
              Send a message to start your conversation.
            </div>
          ) : (
            messages.map((message) => {
              const senderRole = String(
                message?.senderType ?? message?.senderId?.role ?? "",
              ).toLowerCase();
              const isAgent = senderRole === "agent" || senderRole === "admin";

              return (
                <MessageItem
                  key={normalizeId(message?._id ?? message?.id)}
                  message={message}
                  customerName={customerName}
                  customerId={message?.senderType === "customer" ? message.senderId?._id : undefined}
                  agentName={agentName}
                  agentId={message?.senderType !== "customer" ? message.senderId?._id : undefined}
                  isAgent={isAgent}
                />
              );
            })
          )}
        </div>

        <MessageEditor
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onSubmit={sendMessage}
          disabled={!customerToken && (!customerName.trim() || !email.trim())}
          sending={sending}
          error={error}
        />
      </section>
    </main>
  );
};

export default CustomerChat;
