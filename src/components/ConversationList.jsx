import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../hooks/useConversation"; // custom hook (selected conversation store)
import avatar10 from "../../assets/images/avatar/10.png"; // default user image

const ConversationList = () => {
  // Stores all conversations that come from the API
  const [conversationList, setConversationList] = useState([]);

  // Stores the text typed in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Used to save the clicked conversation globally
  const { setSelectedConversation } = useConversation();

  // Used to move to another page
  const navigate = useNavigate();

  // This runs one time when the page loads
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Call the API to get all conversations
        const response = await fetch("http://localhost:3000/api/conversations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // If your API needs a token, uncomment the line below:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // If the server sends an error status (like 404 or 500), stop here
        if (!response.ok) {
          throw new Error(`Failed to fetch conversations (status ${response.status})`);
        }

        const data = await response.json();

        // Check what the API returned (helps in debugging)
        console.log("API response:", data);

        // Make sure we always save an array in state
        // Some APIs send [ ... ] and some send { conversations: [ ... ] }
        const conversations = Array.isArray(data)
          ? data
          : data.conversations || data.data || [];

        setConversationList(conversations);
      } catch (error) {
        // Show the error in the console
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Filter conversations by customer name (search box)
  const filteredConversation = conversationList.filter((conversation) =>
    conversation.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // When a conversation is clicked:
  // 1. save it in global state
  // 2. open its chat page
  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    navigate(`/dashboard/conversation/${conversation.id}`);
  };

  return (
    <div>
      <main className="nxl-container apps-container apps-chat">
        <div className="nxl-content without-header nxl-full-content">
          {/* [ Main Content ] start */}
          <div className="main-content d-flex">
            <div
              className="content-sidebar content-sidebar-xl"
              data-scrollbar-target="#psScrollbarInit"
            >
              {/* ---------- Sidebar header (title + close button) ---------- */}
              <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                <h4 className="fw-bolder mb-0">Chat</h4>
                <a
                  href="javascript:void(0);"
                  className="app-sidebar-close-trigger d-flex"
                >
                  <i className="feather-x"></i>
                </a>
              </div>

              <div className="content-sidebar-body">
                {/* ---------- Search box and filter dropdown ---------- */}
                <div className="py-0 px-4 d-flex align-items-center justify-content-between border-bottom">
                  {/* Search input: updates searchTerm on every key press */}
                  <form className="sidebar-search">
                    <input
                      type="search"
                      className="py-3 px-0 border-0"
                      id="chattingSearch"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>

                  {/* Filter dropdown (Newest / Blocked) */}
                  <div className="dropdown sidebar-filter">
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="dropdown"
                      className="d-flex align-items-center justify-content-center dropdown-toggle"
                      data-bs-offset="0, 15"
                    >
                      {" "}
                      Newest{" "}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-item active"
                        >
                          Newest
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="dropdown-item">
                          Blocked Conversations
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* ---------- Conversation list ---------- */}
                <div className="content-sidebar-items">
                  {/* Show one row for each conversation (after search filter) */}
                  {filteredConversation?.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                      onClick={() => handleConversationClick(conversation)}
                    >
                      {/* User avatar */}
                      <div className="avatar-image">
                        <img
                          src={avatar10}
                          className="img-fluid"
                          alt="User avatar"
                        />
                      </div>

                      {/* Conversation details */}
                      <div className="ms-3 item-desc flex-grow-1">
                        {/* Top row: name, status, time, and menu */}
                        <div className="w-100 d-flex align-items-center justify-content-between">
                          {/* User name + online dot + last active time */}
                          <a
                            href="#"
                            onClick={(event) => event.preventDefault()}
                            className="hstack gap-2 me-2"
                          >
                            <span>{conversation.name}</span>

                            {/* Green dot = online status */}
                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>

                            {/* Last active time (static text for now) */}
                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                              2 min ago
                            </span>
                          </a>

                          {/* Three-dot menu */}
                          {/* stopPropagation: clicking the menu should NOT open the conversation */}
                          <div
                            className="dropdown"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <a
                              href="#"
                              className="avatar-text avatar-sm"
                              data-bs-toggle="dropdown"
                              onClick={(event) => event.preventDefault()}
                            >
                              <i className="feather-more-vertical"></i>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a
                                  href="javascript:void(0)"
                                  className="dropdown-item"
                                >
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="javascript:void(0)"
                                  className="dropdown-item"
                                >
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Latest message preview (max 2 lines) */}
                        <p className="fs-12 fw-semibold text-dark mt-2 mb-0 text-truncate-2-line">
                          {conversation.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------- Footer: Load More button ---------- */}
              <a
                href="javascript:void(0);"
                className="content-sidebar-footer px-4 py-3 fs-11 text-uppercase d-block text-center"
              >
                Load More
              </a>
            </div>
          </div>
          {/* [ Main Content ] end */}
        </div>
      </main>
    </div>
  );
};

export default ConversationList;