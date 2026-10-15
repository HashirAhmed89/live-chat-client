import avatar1 from "../../assets copy/images/avatar/1.png";

const ChatHeader = ({ name, avatar, onBack }) => (
  <header className="content-area-header conversation-chat-header">
    <button
      className="conversation-chat-back"
      type="button"
      onClick={onBack}
      aria-label="Back to conversations"
    >
      <i className="feather-arrow-left" aria-hidden="true"></i>
    </button>
    <div className="conversation-chat-person">
      <div className="avatar-image conversation-chat-avatar">
        <img src={avatar || avatar1} className="img-fluid" alt="" />
      </div>
      <div className="conversation-chat-person-details">
        <h2 className="conversation-chat-name">{name}</h2>
        <span className="conversation-chat-status">
          <span className="conversation-chat-status-dot"></span>
          Online
        </span>
      </div>
    </div>
  </header>
);

export default ChatHeader;
