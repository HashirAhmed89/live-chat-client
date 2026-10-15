import { useConversation } from "../conversation_Context/conversationcontext";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./chat/ChatHeader";
import MessageEditor from "./chat/MessageEditor";
import MessageItem from "./chat/MessageItem";

const isAgentMessage = (message) => {
  if (!message || typeof message !== "object") return false;

  // Explicit flags take priority over the sender's role.
  if (typeof message.isAgent === "boolean") return message.isAgent;
  if (message.isCustomer === true) return false;

  // Messages may store the sender role in different fields depending on the API response.
  const sender = message.sender;
  let role = message.senderType ?? message.senderRole ?? message.role;

  if (role == null) {
    if (typeof sender === "string") {
      role = sender;
    } else {
      role = sender?.role ?? sender?.type;
    }
  }

  if (role == null) role = message.direction;
  if (typeof role !== "string") return false;

  const normalizedRole = role.trim().toLowerCase();
  return normalizedRole === "agent" || normalizedRole === "admin";
};

const ChatWindow = ({ selectedConversation: selectedConversationProp }) => {
  const conversationContext = useConversation();
  const navigate = useNavigate();

  // Use the conversation passed by the list, or fall back to shared context.
  const selectedConversation =
    selectedConversationProp ?? conversationContext?.selectedConversation;
  let messages = [];

  if (Array.isArray(selectedConversation?.messages)) {
    messages = selectedConversation.messages;
  } else if (selectedConversation?.message) {
    messages = [selectedConversation.message];
  }

  return (
    <section className="content-area conversation-chat-window">
      <ChatHeader
        name={
          selectedConversation?.customerId?.name ||
          selectedConversation?.customer?.name ||
          selectedConversation?.customerName ||
          selectedConversation?.name ||
          "Select a conversation"
        }
        avatar={selectedConversation?.avatar}
        onBack={() => navigate("/conversations")}
      />
      <div className="content-area-body conversation-messages">
        {/* Show an empty-state message when there are no messages to display. */}
        {messages.length === 0 ? (
          <div className="conversation-empty-state">
            {selectedConversation
              ? "No messages yet."
              : "Select a conversation to view messages."}
          </div>
        ) : (
          messages.map((message, index) => {
            const isAgent = isAgentMessage(message);

            return (
              <MessageItem
                key={`${selectedConversation?.id ?? "conversation"}-${message?.id ?? index}`}
                message={message}
                name={
                  isAgent
                    ? "You"
                    : selectedConversation?.name || "Customer"
                }
                avatar={
                  isAgent ? undefined : selectedConversation?.avatar
                }
                isAgent={isAgent}
                conversationTime={selectedConversation?.updatedAt}
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
