import avatar1 from "../assets copy/images/avatar/1.png";
import avatar2 from "../assets copy/images/avatar/2.png";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth_Context";

const getMessageText = (message) => {
  const text = message.content ?? message.message ?? message.text;
  return typeof text === "string" || typeof text === "number"
    ? String(text)
    : "";
};

const getMessageTime = (message) => {
  const value = message.createdAt ?? message.timestamp;

  if (typeof value !== "string") {
    return "";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatWindow = ({ selectedConversation }) => {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchConversation = async () => {
      setIsLoading(true);
      setError("");
      setConversation(null);
      setMessages([]);

      try {
        const response = await fetch(
          `http://localhost:3000/api/conversations/${encodeURIComponent(id)}`,
          {
            method: "GET",
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : undefined,
            signal: controller.signal,
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load this conversation.");
        }
        if (!data || typeof data !== "object") {
          throw new Error("The conversation response is invalid.");
        }

        const conversationData = Array.isArray(data)
          ? null
          : data.conversation ?? data;
        const conversationMessages = Array.isArray(data)
          ? data
          : data.messages ?? conversationData?.messages ?? [];

        if (!Array.isArray(conversationMessages)) {
          throw new Error("The conversation response contains an invalid message list.");
        }
        if (conversationMessages.some((message) => !message || typeof message !== "object")) {
          throw new Error("The conversation response contains an invalid message.");
        }

        setConversation(conversationData);
        setMessages(conversationMessages);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load this conversation.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchConversation();

    return () => controller.abort();
  }, [id, token]);

  const activeConversation = conversation ?? selectedConversation;
  const name = activeConversation?.name ?? "Conversation";

  return (
    <div className="content-area" data-scrollbar-target="#psScrollbarInit">
      <div className="content-area-header sticky-top">
        <div className="page-header-left hstack gap-4">
          <Link to="/conversations" className="d-flex" aria-label="Back to conversations">
            <i className="feather-align-left fs-20"></i>
          </Link>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="avatar-image">
              <img src={activeConversation?.avatar ?? avatar1} className="img-fluid" alt="" />
            </div>
            <div className="d-none d-sm-block">
              <div className="fw-bold d-flex align-items-center">
                <h4>{name}</h4>
              </div>
              <div className="d-flex align-items-center mt-1">
                <span className="wd-7 ht-7 rounded-circle opacity-75 me-2 bg-success"></span>
                <span className="fs-9 text-uppercase fw-bold text-success">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area-body">
        {isLoading && <p className="text-muted">Loading messages...</p>}
        {error && <p className="text-danger" role="alert">{error}</p>}
        {!isLoading && !error && messages.length === 0 && (
          <p className="text-muted">No messages in this conversation yet.</p>
        )}
        {!error &&
          messages.map((message, index) => {
            const isOutgoing =
              message.direction === "outgoing" ||
              message.senderType === "agent" ||
              message.sender?.role === "agent" ||
              message.isAgent === true ||
              (user?.id != null &&
                String(message.senderId ?? message.sender?.id) === String(user.id));
            const messageText = getMessageText(message);

            if (!messageText) {
              return null;
            }

            const senderName = isOutgoing
              ? message.sender?.name ?? message.senderName ?? "You"
              : message.sender?.name ?? message.senderName ?? name;

            return (
              <div
                className={`single-chat-item mb-5${isOutgoing ? " text-end" : ""}`}
                key={message.id ?? `${id}-${index}`}
              >
                <div
                  className={`d-flex align-items-center gap-3 mb-3${isOutgoing ? " flex-row-reverse" : ""}`}
                >
                  <a href="javascript:void(0)" className="avatar-image" aria-hidden="true">
                    <img
                      src={isOutgoing ? avatar2 : activeConversation?.avatar ?? avatar1}
                      className="img-fluid rounded-circle"
                      alt=""
                    />
                  </a>
                  <div className={`d-flex align-items-center gap-2${isOutgoing ? " flex-row-reverse" : ""}`}>
                    <span>{senderName}</span>
                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                    <span className="fs-11 text-muted">{getMessageTime(message)}</span>
                  </div>
                </div>
                <div className={`wd-500 p-3 rounded-5 bg-gray-200${isOutgoing ? " ms-auto" : ""}`}>
                  <p className="py-2 px-3 rounded-5 bg-white mb-0">{messageText}</p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="d-flex align-items-center justify-content-between border-top border-gray-5 bg-white sticky-bottom">
        <div className="d-flex align-center">
          <div className="dropdown border-end border-gray-5">
            <a href="javascript:void(0)" data-bs-toggle="dropdown">
              <div
                className="wd-60 d-flex align-items-center justify-content-center"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Pick Template"
                style={{ height: "59px" }}
              >
                <i className="feather-hash"></i>
              </div>
            </a>
            <ul className="dropdown-menu wd-300">
              <li><a href="javascript:void(0)" className="dropdown-item"><i className="feather-file-text me-3"></i>Welcome you message</a></li>
              <li><a href="javascript:void(0)" className="dropdown-item"><i className="feather-file-text me-3"></i>Your issues solved</a></li>
              <li><a href="javascript:void(0)" className="dropdown-item"><i className="feather-file-text me-3"></i>Thank you message</a></li>
              <li><a href="javascript:void(0)" className="dropdown-item"><i className="feather-file-text me-3"></i>Make a offer message</a></li>
            </ul>
          </div>
        </div>
        <input className="form-control border-0 emoji-picker" placeholder="Type your message here..." />
        <div className="border-start border-gray-5 send-message">
          <a
            href="javascript:void(0)"
            className="wd-60 d-flex align-items-center justify-content-center"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            title="Send Message"
            style={{ height: "59px" }}
          >
            <i className="feather-send"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
