const getPersonName = (person) => {
  if (!person || typeof person !== "object") return "";

  const name =
    person.name ??
    person.fullName ??
    person.displayName ??
    person.username;

  return typeof name === "string" ? name.trim() : "";
};

const isObjectId = (value) => /^[a-f\d]{24}$/i.test(value);
const isIdentifier = (value) =>
  isObjectId(value) ||
  /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(value);
const isRoleName = (value) =>
  ["admin", "agent", "customer", "user"].includes(value.toLowerCase());

const getMessageName = (message) => {
  const directNameKeys = [
    "senderName",
    "authorName",
    "userName",
    "customerName",
    "agentName",
  ];

  for (const key of directNameKeys) {
    const value = message?.[key];
    if (
      typeof value === "string" &&
      value.trim() &&
      !isIdentifier(value.trim()) &&
      !isRoleName(value.trim())
    ) {
      return value.trim();
    }
  }

  const personKeys = [
    "sender",
    "senderId",
    "author",
    "authorId",
    "user",
    "userId",
    "customer",
    "customerId",
    "agent",
    "agentId",
    "assignedAgent",
  ];

  for (const key of personKeys) {
    const person = message?.[key];
    const name = getPersonName(person);
    if (name) return name;
  }

  return "";
};

export const getMessageSenderName = (
  message,
  { isAgent, customerName, customerId, agentName, agentId } = {},
) => {
  const senderName = getMessageName(message);

  if (senderName) return senderName;

  const senderId =
    message?.senderId?._id ??
    message?.senderId?.id ??
    message?.sender?._id ??
    message?.sender?.id ??
    message?.senderId ??
    message?.sender;
  const normalizedSenderId =
    senderId == null ? "" : String(senderId);

  // Use a conversation name only when its ID matches this message's sender.
  if (
    normalizedSenderId &&
    normalizedSenderId === String(isAgent ? agentId ?? "" : customerId ?? "")
  ) {
    const matchedName = isAgent ? agentName : customerName;
    if (typeof matchedName === "string" && matchedName.trim()) {
      return matchedName.trim();
    }
  }

  if (!normalizedSenderId) {
    const fallbackName = isAgent ? agentName : customerName;
    if (typeof fallbackName === "string" && fallbackName.trim()) {
      return fallbackName.trim();
    }
  }

  return "Sender unavailable";
};

export const getMessageTimestamp = (message) =>
  message && typeof message === "object"
    ? message.createdAt
    : undefined;

export const formatMessageTimestamp = (timestamp) => {
  if (!timestamp) return "Time unavailable";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Time unavailable";

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  const now = new Date();

  // Keep today's messages compact and show the date for older messages.
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return time;
  }

  const day = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return `${day}, ${time}`;
};
