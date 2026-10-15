// Compose and send a chat message.
const MessageEditor = () => {
  return (
    <div className="content-area-footer border-top bg-white">
      <form className="d-flex align-items-center gap-3 p-3">
        <div className="flex-grow-1">
          <textarea
            className="form-control rounded-5"
            rows="1"
            placeholder="Type your message..."
            aria-label="Type your message"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
          aria-label="Send message"
        >
          <i className="feather-send"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageEditor;
