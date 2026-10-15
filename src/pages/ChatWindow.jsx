import { useConversation } from "../conversation_Context/conversationcontext";
import ChatHeader from "../components/chat/ChatHeader";
import MessageEditor from "../components/chat/MessageEditor";
import MessageItem from "../components/chat/MessageItem";

// Compose the selected conversation's chat view.
const ChatWindow = ({ selectedConversation: selectedConversationProp }) => {
  const conversationContext = useConversation();
  const selectedConversation =
    selectedConversationProp ?? conversationContext?.selectedConversation;
  const messages = Array.isArray(selectedConversation?.messages)
    ? selectedConversation.messages
    : selectedConversation?.message
      ? [selectedConversation.message]
      : [];

  return (
    <div>
      <main className="nxl-container apps-container apps-chat">
        <div className="nxl-content without-header nxl-full-content">
          {/* Keep the existing chat page layout. */}
          <div className="main-content d-flex">
            <div
              className="content-area"
              data-scrollbar-target="#psScrollbarInit"
            >
              <ChatHeader
                name={selectedConversation?.name || "select a conversation"}
              />
              <div className="content-area-body">
                {messages.length === 0 ? (
                  <div className="single-chat-item mb-0">
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        {selectedConversation
                          ? "No messages yet."
                          : "Select a conversation to view messages."}
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <MessageItem
                      key={`${selectedConversation?.id ?? "conversation"}-${message?.id ?? index}`}
                      message={message}
                      name={selectedConversation?.name || "Conversation"}
                      conversationTime={selectedConversation?.updatedAt}
                    />
                  ))
                )}
              </div>
              <MessageEditor />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatWindow;
