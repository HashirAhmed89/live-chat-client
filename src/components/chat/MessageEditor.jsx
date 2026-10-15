// Compose and send a chat message.
const MessageEditor = () => {
  return (
    <footer className="content-area-footer conversation-composer">
      <form
        className="conversation-composer-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <textarea
          className="form-control conversation-composer-input"
          rows="1"
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button
          type="submit"
          className="btn btn-primary conversation-composer-send"
          aria-label="Send message"
        >
          <i className="feather-send"></i>
        </button>
      </form>
    </footer>
  );
};

export default MessageEditor;
