// API functions used by ChatWindow.

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\\/$/ "");

// Load message history for one conversation.
export const fetchConversationMessages = async ({ conversationId, token, signal }) => {
  const response = await fetch(
    `${API_BASE_URL}/api/messages?conversationId=${encodeURIComponent(conversationId)}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      signal,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to load conversation messages.");
  }

  return data;
};

// Send an agent reply to the selected conversation.
export const postAgentReply = async ({ conversationId, content, token }) => {
  const response = await fetch(`${API_BASE_URL}/api/messages/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({ conversationId, content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to send reply.");
  }

  const savedMessage = data?.data?.message;

  if (!savedMessage) {
    throw new Error("The server did not return the saved message.");
  }

  return savedMessage;
};
