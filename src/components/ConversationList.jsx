import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/authcontext";
import avatar10 from "../assets copy/images/avatar/10.png";
import ChatWindow from "./ChatWindow";
import { getSocket } from "../sockets/socket";
import {
  formatMessageTimestamp,
  getMessageTimestamp,
} from "./chat/messageformat";
import { deleteConversation } from "./chat/chatwindowservice";

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
  const [conversationToDelete, setConversationToDelete] = useState(null);
  const [deletingConversationId, setDeletingConversationId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const deleteInProgress = useRef(false);
  const menuDropdownRef = useRef(null);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(null), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

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

  const isAdmin = role.includes("admin");
  const canManageConversations = isAdmin || role.includes("agent");

  useEffect(() => {
    if (openMenuId === null) return undefined;

    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".conversation-list-menu-button") &&
        !menuDropdownRef.current?.contains(event.target)
      ) {
        setOpenMenuId(null);
        setMenuPosition(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("scroll", handleOutsideClick, true);
    window.addEventListener("resize", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("scroll", handleOutsideClick, true);
      window.removeEventListener("resize", handleOutsideClick);
    };
  }, [openMenuId]);

  const toggleConversationMenu = (event, conversationId) => {
    event.stopPropagation();

    if (normalizeId(openMenuId) === normalizeId(conversationId)) {
      setOpenMenuId(null);
      setMenuPosition(null);
      return;
    }

    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const menuHeight = isAdmin ? 88 : 48;

    setOpenMenuId(conversationId);
    setMenuPosition({
      right: Math.max(8, window.innerWidth - buttonBounds.right),
      top: Math.max(
        8,
        Math.min(buttonBounds.bottom, window.innerHeight - menuHeight - 8),
      ),
    });
  };

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

  const confirmDeleteConversation = async () => {
    const conversationId = normalizeId(
      getConversationId(conversationToDelete),
    );

    if (!conversationId || !token || deleteInProgress.current) return;

    deleteInProgress.current = true;
    setDeletingConversationId(normalizeId(conversationId));

    try {
      await deleteConversation({ conversationId, token });

      const normalizedConversationId = normalizeId(conversationId);
      setConversations((previous) =>
        previous.filter(
          (conversation) =>
            normalizeId(getConversationId(conversation)) !==
            normalizedConversationId,
        ),
      );
      setConversationDetailsById((previous) => {
        const remaining = { ...previous };
        delete remaining[normalizedConversationId];
        return remaining;
      });
      setConversationToDelete(null);
      setNotification({
        type: "success",
        message: "Conversation deleted successfully.",
      });

      if (normalizeId(id) === normalizedConversationId) {
        navigate("/conversations", { replace: true });
      }
    } catch (deleteError) {
      console.error("Failed to delete conversation.", deleteError);
      setNotification({
        type: "danger",
        message: deleteError.message || "Failed to delete conversation.",
      });
    } finally {
      deleteInProgress.current = false;
      setDeletingConversationId(null);
    }
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

                    {/* Conversation actions are available to admins and agents. */}
                    {canManageConversations && (
                      <div
                        className="position-relative"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-light conversation-list-menu-button"
                          aria-label={`Actions for ${customerName}`}
                          aria-expanded={
                            normalizeId(openMenuId) === normalizeId(conversationId)
                          }
                          onClick={(event) =>
                            toggleConversationMenu(event, conversationId)
                          }
                        >
                          <span aria-hidden="true">⋮</span>
                        </button>
                      </div>
                    )}

                    {normalizeId(openMenuId) ===
                      normalizeId(conversationId) &&
                      menuPosition &&
                      createPortal(
                        <div
                          ref={menuDropdownRef}
                          className="dropdown-menu show conversation-list-actions-menu"
                          style={{
                            position: "fixed",
                            right: menuPosition.right,
                            top: menuPosition.top,
                            zIndex: 2000,
                          }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {isAdmin && (
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setOpenMenuId(null);
                                setMenuPosition(null);
                              }}
                            >
                              Assign Chat
                            </button>
                          )}

                          <button
                            type="button"
                            className="dropdown-item text-danger"
                            onClick={() => {
                              setOpenMenuId(null);
                              setMenuPosition(null);
                              setConversationToDelete(conversation);
                            }}
                          >
                            Delete Conversation
                          </button>
                        </div>,
                        document.body,
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

      {notification && (
        <div
          className={`alert alert-${notification.type} position-fixed top-0 end-0 m-3`}
          role={notification.type === "danger" ? "alert" : "status"}
          aria-live="polite"
          style={{ zIndex: 1100 }}
        >
          {notification.message}
        </div>
      )}

      {conversationToDelete && (
        <>
          <div className="modal-backdrop show" />
          <div
            className="modal d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-conversation-title"
            aria-describedby="delete-conversation-description"
            style={{ zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="delete-conversation-title">
                    Delete Chat
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    disabled={deletingConversationId !== null}
                    onClick={() => setConversationToDelete(null)}
                  />
                </div>
                <div className="modal-body" id="delete-conversation-description">
                  Are you sure you want to delete this conversation?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={deletingConversationId !== null}
                    onClick={() => setConversationToDelete(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={deletingConversationId !== null}
                    onClick={confirmDeleteConversation}
                  >
                    {deletingConversationId !== null ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ConversationList;
