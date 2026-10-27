
// Utility functions used by ChatWindow and its child components.

// Get an ID whether MongoDB returns an object or a plain ID.
export const getId = (value) => {
  if (value == null) return "";

  return String(value?._id ?? value?.id ?? value);
};

// Get messages from different API response formats.
export const getMessages = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  const list =
    data?.messages ??
    data?.conversation?.messages ??
    data?.data?.messages ??
    data?.data?.conversation?.messages ??
    data?.result?.messages;

  if (Array.isArray(list)) return list;

  const single =
    data?.message ??
    data?.conversation?.message ??
    data?.data?.message ??
    data?.data?.conversation?.message;

  return single ? [single] : [];
};

// Get actual data if the API response is wrapped inside `data`.
export const unwrapData = (data) => {
  return data?.data && typeof data.data === "object"
    ? data.data
    : data;
};

// Handle Socket.IO events that may be wrapped inside `data`.
export const unwrapEvent = (event) => {
  let data = event;

  for (let i = 0; i < 2; i += 1) {
    if (!data?.data || typeof data.data !== "object") {
      break;
    }

    data = data.data;
  }

  return data;
};

// Create a unique key for each message.
export const getMessageKey = (message) => {
  if (message == null || typeof message !== "object") {
    return String(message);
  }

  const id = message._id ?? message.id ?? message.messageId;

  return id != null
    ? `id:${getId(id)}`
    : `message:${JSON.stringify(message)}`;
};

// Merge message lists without adding duplicate messages.
export const mergeMessages = (...groups) => {
  const result = [];
  const seen = new Set();

  groups.flat().forEach((message) => {
    const key = getMessageKey(message);

    if (seen.has(key)) return;

    seen.add(key);
    result.push(message);
  });

  return result;
};

// Check whether a message was sent by an agent or admin.
export const isAgentMessage = (message) => {
  if (!message || typeof message !== "object") return false;

  if (typeof message.isAgent === "boolean") {
    return message.isAgent;
  }

  if (message.isCustomer === true) return false;

  const sender =
    message.sender && typeof message.sender === "object"
      ? message.sender
      : message.senderId && typeof message.senderId === "object"
        ? message.senderId
        : null;

  const role =
    message.senderType ??
    message.senderRole ??
    message.role ??
    (typeof message.sender === "string" ? message.sender : null) ??
    sender?.role ??
    sender?.type ??
    message.direction;

  if (typeof role !== "string") return false;

  return ["agent", "admin"].includes(role.trim().toLowerCase());
};
