// API functions used by ChatWindow.

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000")

// Load tickets for the authenticated user.
export const fetchTickets = async ({ token, signal }) => {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/getTickets`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      signal,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to load tickets.");
  }

  return data;
};

// Fetch the available agents for ticket assignment.
export const fetchAgents = async ({ token, signal }) => {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/getAllAgents`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      signal,
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to load agents.");
  }

  if (!Array.isArray(data?.data)) {
    throw new Error("The server did not return a valid agent list.");
  }

  return data.data;
};

// Load one ticket by ID for the authenticated user.
export const fetchTicketById = async ({ ticketId, token, signal }) => {
  if (!ticketId || !String(ticketId).trim()) {
    throw new Error("A valid ticket ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/getTicketById/${encodeURIComponent(String(ticketId).trim())}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      signal,
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Failed to load ticket details.");
  }

  return data;
};

// Delete one ticket using the authenticated user's token.
export const deleteTicket = async ({ ticketId, token }) => {
  if (!ticketId || !String(ticketId).trim()) {
    throw new Error("A valid ticket ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/getTickets/${encodeURIComponent(String(ticketId).trim())}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to delete ticket.");
  }

  return data;
};

// Assign a ticket to the selected agent.
export const assignTicket = async ({ ticketId, agentId, token }) => {
  if (!ticketId || !String(ticketId).trim()) {
    throw new Error("A valid ticket ID is required.");
  }

  if (!agentId || !String(agentId).trim()) {
    throw new Error("A valid agent is required.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/assignTicket/${encodeURIComponent(String(ticketId).trim())}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify({ agentId }),
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to assign ticket.");
  }

  if (!data?.data || typeof data.data !== "object") {
    throw new Error("The server did not return the updated ticket.");
  }

  return data;
};

// Update the status of one ticket.
export const updateTicketStatus = async ({
  ticketId,
  status,
  token,
}) => {
  if (!ticketId || !String(ticketId).trim()) {
    throw new Error("A valid ticket ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/updateTicketStatus/${encodeURIComponent(String(ticketId).trim())}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify({ status }),
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to update ticket status.");
  }

  if (!data?.data || typeof data.data !== "object") {
    throw new Error("The server did not return the updated ticket.");
  }

  return data;
};

// Update the priority of one ticket.
export const updateTicketPriority = async ({
  ticketId,
  priority,
  token,
}) => {
  if (!ticketId || !String(ticketId).trim()) {
    throw new Error("A valid ticket ID is required.");
  }

  const allowedPriorities = ["low", "medium", "high", "urgent"];
  if (!allowedPriorities.includes(priority)) {
    throw new Error("Invalid ticket priority.");
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/updateTicketPriority/${encodeURIComponent(String(ticketId).trim())}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify({ priority }),
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to update ticket priority.");
  }

  if (!data?.data || typeof data.data !== "object") {
    throw new Error("The server did not return the updated ticket.");
  }

  return data;
};

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

// Delete one conversation.
export const deleteConversation = async ({ conversationId, token }) => {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/conversations/${encodeURIComponent(conversationId)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
    },
  );

  const responseBody = await response.text();
  let data = null;

  if (responseBody) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { message: responseBody };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete conversation.");
  }

  return data;
};
