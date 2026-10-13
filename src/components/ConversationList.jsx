import avatar1 from "../assets copy/images/avatar/1.png";
import avatar2 from "../assets copy/images/avatar/2.png";
import avatar10 from "../assets copy/images/avatar/10.png";
import avatar11 from "../assets copy/images/avatar/11.png";
import avatar12 from "../assets copy/images/avatar/12.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConversation } from "../conversation_Context/conversationcontext";

const ConversationList = () => {

  const [conversationList, setConversationList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const {setSelectedConversation} = useConversation()

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/conversations",
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const conversations = await response.json();
        setConversationList(conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Filter conversations by customer name
  const filteredConversation = conversationList.filter((conversation) =>
    conversation.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleConversationClick = (conversation)=>{
    setSelectedConversation(conversation)
    navigate(`/dashboard/conversation/${conversation.id}`)

  }

  const navigate = useNavigate();

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
                <div className="py-0 px-4 d-flex align-items-center justify-content-between border-bottom">
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
                <div className="content-sidebar-items">
                  {filteredConversation?.map((conversation) => (
                    // Render each conversation from the array
                    <div
                      key={conversation.id}
                      className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                      onClick={() =>
                        handleConversationClick(conversation)
                      }
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
                        {/* User name and dropdown */}
                        <div className="w-100 d-flex align-items-center justify-content-between">
                          {/* User information */}
                          <a
                            href="#"
                            onClick={(event) => event.preventDefault()}
                            className="hstack gap-2 me-2"
                          >
                            <span>{conversation.name}</span>

                            {/* Online status */}
                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>

                            {/* Last active time */}
                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                              2 min ago
                            </span>
                          </a>

                          {/* Dropdown menu */}
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
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Latest message preview */}
                        <p className="fs-12 fw-semibold text-dark mt-2 mb-0 text-truncate-2-line">
                          {conversation.message}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/2")}
                  >
                    <div className="bg-success text-white avatar-text">N</div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Norman Byrd</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-danger"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            5 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 fw-semibold text-dark mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/3")}
                  >
                    <div className="avatar-image">
                      <img src={avatar11} className="img-fluid" alt="image" />
                    </div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Laura Foreman</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            7 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div> */}
                  {/* <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/4")}
                  >
                    <div className="bg-warning text-white avatar-text">B</div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Bryan Waters</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-gray-500"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            10 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/5")}
                  >
                    <div className="avatar-image">
                      <img src={avatar12} className="img-fluid" alt="image" />
                    </div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Ursula Sanders</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            9 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div> */}
                  {/* <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/6")}
                  >
                    <div className="bg-danger text-white avatar-text">E</div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Edward Andrade</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            13 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/7")}
                  >
                    <div className="avatar-image">
                      <img src={avatar1} className="img-fluid" alt="image" />
                    </div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Alexandra Della</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            15 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/8")}
                  >
                    <div className="bg-gray-200 text-dark avatar-text">T</div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Timothy Boyd</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            13 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div> */}
                  {/* <div
                    className="p-4 d-flex position-relative border-bottom c-pointer single-item"
                    onClick={() => navigate("/dashboard/conversations/9")}
                  >
                    <div className="avatar-image">
                      <img src={avatar2} className="img-fluid" alt="image" />
                    </div>
                    <div className="ms-3 item-desc">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <a
                          href="javascript:void(0);"
                          className="hstack gap-2 me-2"
                        >
                          <span>Curtis Green</span>
                          <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                          <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">
                            20 min ago
                          </span>
                        </a>
                        <div
                          className="dropdown"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <a
                            href="javascript:void(0)"
                            className="avatar-text avatar-sm"
                            data-bs-toggle="dropdown"
                          >
                            <i className="feather-more-vertical"></i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-check-circle me-3"></i>
                                  <span>Mark as Read/Unread</span>
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" className="dropdown-item">
                                  <i className="feather-trash-2 me-3"></i>
                                  <span>Delete Conversation</span>
                                </a>
                              </li>
                            </ul>
                        </div>
                      </div>
                      <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">
                        Lorem ipsum dolor sit amet, consec tetuer adipi scing
                        elit aenean commodo ipsum dolor sit amet, consec tetuer
                        adipi scing elit aenean commodo
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
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
