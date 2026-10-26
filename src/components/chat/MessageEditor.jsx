// Compose and send a chat message.
const MessageEditor = ({
  value = "",
  onChange,
  onSubmit,
  disabled = false,
  sending = false,
  error = "",
}) => {
  return (
    <footer className="content-area-footer conversation-composer">
      <form
        className="conversation-composer-form"
        onSubmit={onSubmit}
      >
        <textarea
          className="form-control conversation-composer-input"
          rows="1"
          placeholder="Type your message..."
          aria-label="Type your message"
          value={value}
          onChange={onChange}
          disabled={disabled || sending}
        />
        <button
          type="submit"
          className="btn btn-primary conversation-composer-send"
          aria-label="Send message"
          disabled={disabled || sending || !value.trim()}
        >
          <i className="feather-send"></i>
        </button>
      </form>
      {error && (
        <p className="text-danger mb-0 mt-2" role="alert">
          {error}
        </p>
      )}
      {sending && <span className="visually-hidden">Sending message...</span>}
    </footer>
  );
};

export default MessageEditor;
