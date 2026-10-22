import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth_Context";
import avatar10 from "../assets copy/images/avatar/10.png";
import ChatWindow from "./ChatWindow";
import { getSocket } from "../sockets/socket";
import {
  formatMessageTimestamp,
  getMessageTimestamp,
} from "./chat/messageFormat";

const normalizeId = (value) => {
  if (value == null) return "";
  return String(value?._id ?? value?.id ?? value);
};

// Conversation ki unique ID hasil karein
const getConversationId = (conversation) => {
  return conversation?._id || conversation?.id;
};

// Customer Name
const getCustomerName = (conversation) => {
  const customerId =
    typeof conversation?.customerId === "object"
      ? conversation.customerId
      : null;
  const name = [
    conversation?.customer?.name,
    conversation?.customer?.fullName,
    conversation?.customer?.displayName,
    customerId?.name,
    customerId?.fullName,
    customerId?.displayName,
    conversation?.customerName,
    conversation?.name,
  ].find((value) => typeof value === "string" && value.trim());

  return typeof name === "string" && name.trim() ? name.trim() : "Customer";
};

// Conversation ka last message hasil karein
const getLastMessage = (conversation) => {
  const messages = Array.isArray(conversation?.messages)
    ? conversation.messages
    : [];

  const message =
    conversation?.lastMessage ||
    messages[messages.length - 1] ||
    conversation?.message;

  if (typeof message === "string") {
    return message;
  }

  return (
    message?.content || message?.text || message?.message || "No messages yet."
  );
};

// API response se conversations ki array hasil karein
const getConversationArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.conversation)) return data.conversation;
  if (Array.isArray(data?.conversations)) return data.conversations;
  if (Array.isArray(data?.data?.conversation)) return data.data.conversation;
  if (Array.isArray(data?.data?.conversations)) return data.data.conversations;
  if (Array.isArray(data?.data)) return data.data;

  return [];
};

const unwrapEventData = (event) => {
  let data = event;

  for (let depth = 0; depth < 2; depth += 1) {
    if (!data?.data || typeof data.data !== "object") break;
    data = data.data;
  }

  return data;
};

const getMessageIdentity = (message) => {
  if (message == null) return String(message);
  if (typeof message !== "object") return `${typeof message}:${message}`;

  const messageId = message._id ?? message.id ?? message.messageId;
  return messageId == null
    ? `message:${JSON.stringify(message)}`
    : `id:${normalizeId(messageId)}`;
};

const mergeConversationsWithCurrentState = (loadedConversations, current) => {
  const currentById = new Map(
    current.map((conversation) => [
      normalizeId(getConversationId(conversation)),
      conversation,
    ]),
  );

  const merged = loadedConversations.map((conversation) => {
    const conversationId = normalizeId(getConversationId(conversation));
    const existing = currentById.get(conversationId);

    if (!existing) return conversation;

    const customer =
      conversation.customer?.name || conversation.customerName
        ? conversation.customer ?? conversation.customerId
        : existing.customer?.name || existing.customerName
          ? existing.customer ?? existing.customerId
          : conversation.customer ?? conversation.customerId;
    const lastMessage =
      conversation.lastMessage ??
      conversation.messages?.at(-1) ??
      existing.lastMessage ??
      existing.messages?.at(-1);
    const messages = [
      ...new Map(
        [
          ...(Array.isArray(conversation.messages) ? conversation.messages : []),
          ...(Array.isArray(existing.messages) ? existing.messages : []),
        ].map((message) => [getMessageIdentity(message), message]),
      ).values(),
    ];

    return {
      ...conversation,
      ...existing,
      ...(customer && typeof customer === "object"
        ? { customer, customerId: customer }
        : {}),
      lastMessage,
      lastMessageAt:
        conversation.lastMessageAt ??
        lastMessage?.createdAt ??
        existing.lastMessageAt,
      messages,
    };
  });

  return merged;
};

const ConversationList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();

  // Conversations aur UI ki state
  const [conversations, setConversations] = useState([]);
  const [conversationDetailsById, setConversationDetailsById] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleConversationDetails = useCallback((conversationId, details) => {
    if (!details?.customer || typeof details.customer !== "object") return;

    const normalizedConversationId = normalizeId(conversationId);
    const customerName =
      details.customer.name ??
      details.customer.fullName ??
      details.customer.displayName;

    // Keep API-loaded customer details even if the conversation list is still loading.
    setConversationDetailsById((previous) => ({
      ...previous,
      [normalizedConversationId]: details.customer,
    }));

    setConversations((previous) =>
      previous.map((conversation) =>
        normalizeId(getConversationId(conversation)) ===
        normalizedConversationId
          ? {
              ...conversation,
              customer: details.customer,
              customerId: details.customer,
              customerName: customerName ?? conversation.customerName,
            }
          : conversation,
      ),
    );
  }, []);

  // Check karein ke login user admin hai ya nahi
  const role = String(
    user?.role || user?.userRole || user?.type || "",
  ).toLowerCase();

  const isAdmin = role === "admin";

  // Backend se conversations fetch karein
  useEffect(() => {
    const controller = new AbortController();

    const fetchConversations = async () => {
      if (!token) {
        setConversations([]);
        setLoading(false);
        setError("Please login first.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.info("Loading conversations from the API.");
        const apiBaseUrl = (
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        ).replace(/\/$/, "");
        const response = await fetch(
          `${apiBaseUrl}/api/conversations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",

              // Login token backend ko bhejein
              "x-api-key": token,
            },
            signal: controller.signal,
          },
        );

        const data = await response.json();

        // Agar API response successful nahi hai
        if (!response.ok) {
          throw new Error(data?.message || "Failed to load conversations.");
        }

        // API response ko array mein convert karein
        const conversationList = getConversationArray(data);

        console.info("Conversations loaded from the API.", {
          count: conversationList.length,
          conversations: conversationList.map((conversation) => ({
            conversationId: normalizeId(getConversationId(conversation)),
            customerName: getCustomerName(conversation),
          })),
        });
        setConversations((previous) =>
          mergeConversationsWithCurrentState(conversationList, previous),
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load conversations.", err);
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchConversations();
    return () => controller.abort();
  }, [token]);

  useEffect(() => {
    // Get the existing socket connection
    const socket = getSocket();

    // Stop if the socket is not available
    if (!socket) {
      console.warn("Conversation list cannot receive updates: Socket.IO is not initialized.");
      return undefined;
    }

    // Handle a new message event
    const handleNewMessage = (event) => {
      const data = unwrapEventData(event);
      console.info("Received new_message event in ConversationList.", data);
      const conversation = data?.conversation;
      const customer =
        data?.customer ??
        (typeof conversation?.customerId === "object"
          ? conversation.customerId
          : null) ??
        conversation?.customer;
      const message =
        data?.message ??
        data?.savedMessage ??
        conversation?.messages?.at(-1) ??
        (data?.conversationId != null || data?.conversation_id != null
          ? data
          : null);
      const conversationId = normalizeId(
        data?.conversationId ??
          data?.conversation_id ??
          conversation?._id ??
          conversation?.id ??
          message?.conversationId ??
          message?.conversation_id,
      );

      if (!conversationId || !message) {
        console.warn("Ignoring new_message event with incomplete identifiers.", {
          hasConversationId: Boolean(conversationId),
          hasMessage: Boolean(message),
        });
        return;
      }

      console.info("Updating conversation list from new_message.", {
        conversationId,
        messageId: normalizeId(message?._id ?? message?.id ?? message?.messageId),
      });
      setConversations((previous) => {
        const existing = previous.find(
          (item) => normalizeId(getConversationId(item)) === conversationId,
        );
        const updatedConversation = {
          ...(existing || {}),
          ...(conversation || {}),
          ...(customer && typeof customer === "object"
            ? {
                customer,
                customerId:
                  conversation?.customerId ??
                  existing?.customerId ??
                  customer,
                customerName:
                  customer.name ??
                  customer.fullName ??
                  customer.displayName ??
                  existing?.customerName,
              }
            : {}),
          _id:
            getConversationId(conversation || {}) ||
            getConversationId(existing || {}) ||
            conversationId,
          lastMessage: message,
          messages: [
            ...new Map(
              [
                ...(Array.isArray(existing?.messages) ? existing.messages : []),
                ...(Array.isArray(conversation?.messages)
                  ? conversation.messages
                  : []),
                message,
              ].map((item) => [getMessageIdentity(item), item]),
            ).values(),
          ],
          updatedAt:
            message?.createdAt ||
            conversation?.updatedAt ||
            existing?.updatedAt,
        };
        const remaining = previous.filter(
          (item) => normalizeId(getConversationId(item)) !== conversationId,
        );

        return [updatedConversation, ...remaining];
      });
    };

    // Handle conversation assignment to an agent
    const handleAssigned = (conversation) => {
      // Stop if no conversation is received
      if (!conversation) return;

      // Update the agent's conversation list
      setConversations((previous) => {
        const filtered = previous.filter(
          (item) =>
            normalizeId(getConversationId(item)) !==
            normalizeId(getConversationId(conversation)),
        );

        return [conversation, ...filtered];
      });
    };

    // Handle conversation removal from the agent's list
    const handleRemoved = (conversationId) => {
      // Remove the conversation from the list
      setConversations((previous) =>
        previous.filter(
          (item) => normalizeId(getConversationId(item)) !== normalizeId(conversationId),
        ),
      );
    };

    // Listen for real-time socket events
    socket.on("new_message", handleNewMessage);
    socket.on("conversation_assigned", handleAssigned);
    socket.on("conversation_removed", handleRemoved);

    // Remove event listeners when the component unmounts
    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("conversation_assigned", handleAssigned);
      socket.off("conversation_removed", handleRemoved);
    };
  }, []);

  // Search ke mutabiq conversations filter karein
  const conversationsWithDetails = conversations.map((conversation) => {
    const customerDetails =
      conversationDetailsById[
        normalizeId(getConversationId(conversation))
      ];

    if (!customerDetails) return conversation;

    return {
      ...conversation,
      customer: customerDetails,
      customerId: customerDetails,
      customerName:
        customerDetails.name ??
        customerDetails.fullName ??
        customerDetails.displayName ??
        conversation.customerName,
    };
  });

  const filteredConversations = conversationsWithDetails.filter((conversation) => {
    const name = getCustomerName(conversation);

    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Click ki hui conversation open karein
  const openConversation = (conversation) => {
    const conversationId = getConversationId(conversation);

    if (!conversationId) return;

    navigate(`/conversations/${conversationId}`);
    setOpenMenuId(null);
  };

  // Selected conversation hasil karein
  const selectedConversation = conversationsWithDetails.find(
    (conversation) =>
      normalizeId(getConversationId(conversation)) === normalizeId(id),
  );

  return (
    <main
      className={`main-content conversation-page${
        id ? " conversation-page--selected" : ""
      }`}
    >
      <div className="conversation-page__layout">
        {/* Left side: Conversation list */}
        <aside className="content-sidebar conversation-list-panel">
          {/* Header */}
          <div className="conversation-list-header">
            <h5 className="mb-3">Conversations</h5>

            {/* Search input */}
            <input
              type="text"
              className="form-control"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {/* Conversation list body */}
          <div className="conversation-list-body">
            {loading ? (
              <p className="text-center p-3">Loading conversations...</p>
            ) : error ? (
              <p className="text-danger text-center p-3">{error}</p>
            ) : filteredConversations.length === 0 ? (
              <p className="text-center p-3">No conversations found.</p>
            ) : (
              filteredConversations.map((conversation) => {
                const conversationId = getConversationId(conversation);

                const customerName = getCustomerName(conversation);

                const lastMessage = getLastMessage(conversation);
                const latestMessage =
                  conversation?.lastMessage ||
                  conversation?.messages?.at(-1) ||
                  conversation?.message;
                const lastMessageTime =
                  getMessageTimestamp(latestMessage) ||
                  conversation?.updatedAt ||
                  conversation?.lastMessageAt;
                const timestampDate =
                  lastMessageTime && new Date(lastMessageTime);

                // Check karein ke ye conversation selected hai
                const isSelected =
                  normalizeId(conversationId) === normalizeId(id);

                return (
                  <div
                    key={conversationId}
                    className={`conversation-list-item${
                      isSelected ? " is-selected" : ""
                    }`}
                  >
                    {/* Conversation open karne ka area */}
                    <div
                      className="d-flex align-items-center gap-2 flex-grow-1"
                      role="button"
                      onClick={() => openConversation(conversation)}
                      style={{
                        cursor: "pointer",
                        minWidth: 0,
                      }}
                    >
                      {/* Customer avatar */}
                      <img
                        src={avatar10}
                        alt="Customer"
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />

                      {/* Customer name aur last message */}
                      <div
                        className="conversation-list-item-details"
                        style={{ minWidth: 0 }}
                      >
                        <h6 className="conversation-list-item-name">
                          {customerName}
                        </h6>

                        <div className="conversation-list-item-last-message">
                          <p className="conversation-list-item-preview">
                            {lastMessage}
                          </p>
                          <time
                            className="conversation-list-item-time"
                            dateTime={
                              timestampDate &&
                              !Number.isNaN(timestampDate.getTime())
                                ? timestampDate.toISOString()
                                : undefined
                            }
                          >
                            {formatMessageTimestamp(lastMessageTime)}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Three-dot menu sirf admin ko show hoga */}
                    {isAdmin && (
                      <div className="position-relative">
                        <button
                          type="button"
                          className="btn btn-sm btn-light"
                          onClick={(event) => {
                            event.stopPropagation();

                            setOpenMenuId(
                              openMenuId === conversationId
                                ? null
                                : conversationId,
                            );
                          }}
                        >
                          <i className="feather-more-vertical" />
                        </button>

                        {/* Dropdown menu */}
                        {normalizeId(openMenuId) ===
                          normalizeId(conversationId) && (
                          <div
                            className="dropdown-menu show"
                            style={{
                              position: "absolute",
                              right: 0,
                              top: "100%",
                              zIndex: 1000,
                            }}
                          >
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setOpenMenuId(null);

                                // Yahan Assign Chat API connect karni hai
                              }}
                            >
                              Assign Chat
                            </button>

                            <button
                              type="button"
                              className="dropdown-item text-danger"
                              onClick={() => {
                                setOpenMenuId(null);

                                // Yahan Delete Chat API connect karni hai
                              }}
                            >
                              Delete Chat
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right side: Selected conversation ki chat */}
        <div className="conversation-chat-column">
          {selectedConversation || id ? (
            <ChatWindow
              selectedConversation={selectedConversation}
              onConversationData={handleConversationDetails}
            />
          ) : (
            <div className="conversation-chat-window conversation-empty-window">
              <p className="text-muted">
                Select a conversation to view messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ConversationList;
