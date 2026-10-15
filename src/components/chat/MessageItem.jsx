import avatar1 from "../../assets copy/images/avatar/1.png";

// Display a single message and its sender details.
const MessageItem = ({ message, name, conversationTime }) => {
  const messageText =
    typeof message === "string"
      ? message
      : message?.text ?? message?.message ?? message?.content ?? "";
  const messageTime =
    typeof message === "object" && message !== null
      ? message.updatedAt ?? message.createdAt
      : undefined;

  return (
    <div className="single-chat-item mb-5">
      <div className="d-flex align-items-center gap-3 mb-3">
        <a href="javascript:void(0)" className="avatar-image">
          <img
            src={avatar1}
            className="img-fluid rounded-circle"
            alt="image"
          />
        </a>
        <div className="d-flex align-items-center gap-2">
          <a href="#" onClick={(event) => event.preventDefault()}>
            {name}
          </a>
          <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
          <span className="fs-11 text-muted">
            {messageTime ?? conversationTime}
          </span>
        </div>
      </div>
      <div className="wd-500 p-3 rounded-5 bg-gray-200">
        <p className="py-2 px-3 rounded-5 bg-white mb-0">{messageText}</p>
      </div>
    </div>
  );
};

export default MessageItem;
