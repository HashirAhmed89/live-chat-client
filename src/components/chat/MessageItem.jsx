import avatar1 from "../../assets copy/images/avatar/1.png";

const MessageItem = ({
  message,
  name,
  avatar,
  isAgent = false,
  conversationTime,
}) => {
  const messageText =
    typeof message === "string"
      ? message
      : message?.text ?? message?.message ?? message?.content ?? "";
  const messageTime =
    typeof message === "object" && message !== null
      ? message.updatedAt ?? message.createdAt
      : undefined;

  return (
    <article
      className={`conversation-message${isAgent ? " conversation-message--agent" : " conversation-message--customer"}`}
    >
      <div className="conversation-message-meta">
        <span className="conversation-message-name">{name}</span>
        {(messageTime ?? conversationTime) && (
          <time className="conversation-message-time">
            {messageTime ?? conversationTime}
          </time>
        )}
      </div>
      <div className="conversation-message-content">
        <div className="conversation-message-avatar">
          <img src={avatar || avatar1} className="img-fluid" alt="" />
        </div>
        <p className="conversation-message-bubble">{messageText}</p>
      </div>
    </article>
  );
};

export default MessageItem;
