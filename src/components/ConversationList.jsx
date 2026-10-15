import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth_Context";
import avatar10 from "../assets copy/images/avatar/10.png";
import ChatWindow from "./ChatWindow";

// Get conversation ID from API data
const getConversationId = (conversation) => {
  return conversation._id || conversation.id;
};

// Get customer's name
const getCustomerName = (conversation) => {
  return (
    conversation.customerId?.name ||
    conversation.customer?.name ||
    conversation.customerName ||
    conversation.name ||
    "Customer"
  );
};

// Get the latest message to show in the conversation list
const getLastMessage = (conversation) => {
  const messages = Array.isArray(conversation.messages)
    ? conversation.messages
    : [];

  const message =
    conversation.lastMessage ||
    messages[messages.length - 1] ||
    conversation.message;

  if (typeof message === "string") {
    return message;
  }

  return (
    message?.content ||
    message?.text ||
    message?.message ||
    "No messages yet."
  );
};

// Extract conversations from the API response
const getConversationArray = (data) => {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.conversation)) {
    return data.conversation;
  }

  if (Array.isArray(data?.conversations)) {
    return data.conversations;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.data?.conversation)) {
    return data.data.conversation;
  }

  if (Array.isArray(data?.data?.conversations)) {
    return data.data.conversations;
  }

  // Show an error if the response does not contain a list
  throw new Error("Invalid conversations API response.");
};

const ConversationList = () => {
  const navigate = useNavigate();

  // Get conversation ID from the URL
  const { id } = useParams();

  // Get login token from authentication context
  const { token } = useAuth();

  // Store all conversations
  const [conversations, setConversations] = useState([]);

  // Store text entered in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Track loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch conversations when the token changes
  useEffect(() => {
    const controller = new AbortController();

    const fetchConversations = async () => {
      // User must be logged in
      if (!token) {
        setError("Please log in to view conversations.");
        setLoading(false);
        return;
      }

      try {
        // Send request to backend
        const response = await fetch(
          "http://localhost:3000/api/conversations",
          {
            headers: {
              "x-api-key": token,
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        // Check if the API request failed
        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load conversations."
          );
        }

        // Save conversations in state
        setConversations(getConversationArray(data));
        setError("");
      } catch (err) {
        // Ignore errors caused by cancelling the request
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load conversations.");
          console.error("Failed to load conversations:", err);
        }
      } finally {
        // Stop loading when the request finishes
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchConversations();

    // Cancel the request if the effect is cleaned up
    return () => controller.abort();
  }, [token]);

  // Filter conversations by customer name
  const filteredConversations = conversations.filter((conversation) =>
    getCustomerName(conversation)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Open the clicked conversation
  const openConversation = (conversation) => {
    const conversationId = getConversationId(conversation);

    if (conversationId) {
      navigate(`/conversations/${conversationId}`);
    }
  };

  // Find the conversation selected in the URL
  const selectedConversation = conversations.find(
    (conversation) =>
      String(getConversationId(conversation)) === String(id)
  );

  return (
    <main
      className={`nxl-container apps-container apps-chat conversation-page${
        id ? " conversation-page--selected" : ""
      }`}
    >
      <div className="nxl-content without-header nxl-full-content">
        <div className="main-content d-flex conversation-page__layout">

          {/* Left side: Conversation list */}
          <aside className="content-sidebar content-sidebar-xl">

            {/* Sidebar heading */}
            <div className="content-sidebar-header bg-white sticky-top">
              <h4 className="fw-bolder mb-0">Chat</h4>
            </div>

            {/* Search box */}
            <div className="p-4 border-bottom">
              <input
                type="search"
                className="form-control"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            {/* Show loading, error, empty state, or conversations */}
            <div className="content-sidebar-items">
              {loading ? (
                <p className="p-4">Loading conversations...</p>
              ) : error ? (
                <p className="p-4 text-danger" role="alert">
                  {error}
                </p>
              ) : filteredConversations.length === 0 ? (
                <p className="p-4 text-muted">
                  No conversations found.
                </p>
              ) : (
                filteredConversations.map((conversation) => {
                  const conversationId =
                    getConversationId(conversation);

                  const name = getCustomerName(conversation);

                  const isSelected =
                    String(conversationId) === String(id);

                  return (
                    <div
                      key={conversationId}
                      className={`p-4 d-flex border-bottom c-pointer single-item ${
                        isSelected ? "bg-light" : ""
                      }`}
                      onClick={() =>
                        openConversation(conversation)
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          openConversation(conversation);
                        }
                      }}
                    >
                      {/* Customer avatar */}
                      <div className="avatar-image">
                        <img
                          src={
                            conversation.customer?.avatar ||
                            conversation.avatar ||
                            avatar10
                          }
                          className="img-fluid"
                          alt={name}
                        />
                      </div>

                      {/* Customer name and last message */}
                      <div className="ms-3 flex-grow-1">
                        <span>{name}</span>

                        <p className="fs-12 mt-2 mb-0 text-muted text-truncate">
                          {getLastMessage(conversation)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* Right side: Selected conversation chat */}
          {selectedConversation ? (
            <ChatWindow
              selectedConversation={selectedConversation}
            />
          ) : (
            <section className="content-area conversation-chat-window">
              <div className="conversation-empty-state">
                Select a conversation to view messages.
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
};

export default ConversationList;