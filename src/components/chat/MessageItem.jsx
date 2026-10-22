import avatar1 from "../../assets copy/images/avatar/1.png";
import {
  formatMessageTimestamp,
  getMessageSenderName,
  getMessageTimestamp,
} from "./messageFormat";

const MessageItem = ({
  message,
  name,
  customerName,
  customerId,
  agentName,
  agentId,
  avatar,
  isAgent = false,
}) => {
  const messageText =
    typeof message === "string"
      ? message
      : message?.text ?? message?.message ?? message?.content ?? "";
  const timestamp = getMessageTimestamp(message);
  const timestampDate = timestamp ? new Date(timestamp) : null;
  const validTimestamp =
    timestampDate && !Number.isNaN(timestampDate.getTime());
  const senderName = getMessageSenderName(message, {
    isAgent,
    customerName: customerName || (!isAgent ? name : undefined),
    customerId,
    agentName: agentName || (isAgent ? name : undefined),
    agentId,
  });

  return (
    <article
      className={`conversation-message${isAgent ? " conversation-message--agent" : " conversation-message--customer"}`}
    >
      <div className="conversation-message-meta">
        <span className="conversation-message-name">{senderName}</span>
        <time
          className="conversation-message-time"
          dateTime={validTimestamp ? timestampDate.toISOString() : undefined}
        >
          {formatMessageTimestamp(timestamp)}
        </time>
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
