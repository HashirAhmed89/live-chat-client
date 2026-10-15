import avatar1 from "../assets copy/images/avatar/1.png";
import avatar2 from "../assets copy/images/avatar/2.png";
import avatar10 from "../assets copy/images/avatar/10.png";
import avatar11 from "../assets copy/images/avatar/11.png";
import avatar12 from "../assets copy/images/avatar/12.png";
import { useNavigate, useParams } from "react-router-dom";
import ChatWindow from "../pages/ChatWindow"

const lorem =
  "Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo";


const conversations = [
  {
    id: 1,
    name: "Erna Serpa",
    time: "2 min ago",
    avatar: avatar10,
    dot: "bg-success",
    unread: true,
  },
  {
    id: 2,
    name: "Norman Byrd",
    time: "5 min ago",
    letter: "N",
    letterClass: "bg-success text-white",
    dot: "bg-danger",
    unread: true,
  },
  {
    id: 3,
    name: "Laura Foreman",
    time: "7 min ago",
    avatar: avatar11,
    dot: "bg-success",
  },
  {
    id: 4,
    name: "Bryan Waters",
    time: "10 min ago",
    letter: "B",
    letterClass: "bg-warning text-white",
    dot: "bg-gray-500",
  },
  {
    id: 5,
    name: "Ursula Sanders",
    time: "9 min ago",
    avatar: avatar12,
    dot: "bg-success",
  },
  {
    id: 6,
    name: "Edward Andrade",
    time: "13 min ago",
    letter: "E",
    letterClass: "bg-danger text-white",
    dot: "bg-success",
  },
  {
    id: 7,
    name: "Alexandra Della",
    time: "15 min ago",
    avatar: avatar1,
    dot: "bg-success",
  },
  {
    id: 8,
    name: "Timothy Boyd",
    time: "13 min ago",
    letter: "T",
    letterClass: "bg-gray-200 text-dark",
    dot: "bg-success",
  },
  {
    id: 9,
    name: "Curtis Green",
    time: "20 min ago",
    avatar: avatar2,
    dot: "bg-success",
  },
];

const ConversationItem = ({ item, onClick, isSelected }) => {
  return (
    <div
      className={`p-4 d-flex position-relative border-bottom c-pointer single-item ${
        isSelected ? "bg-light" : ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Avatar */}
      {item.avatar ? (
        <div className="avatar-image">
          <img src={item.avatar} className="img-fluid" alt={item.name} />
        </div>
      ) : (
        <div className={`${item.letterClass} avatar-text`}>{item.letter}</div>
      )}

      {/* Conversation details */}
      <div className="ms-3 item-desc">
        <div className="d-flex align-items-center justify-content-between">
          <span>{item.name}</span>

          <div className={`wd-5 ht-5 rounded-circle ${item.dot}`}></div>

          <span className="fs-10 text-muted d-none d-sm-block">
            {item.time}
          </span>

          {/* Dropdown */}
          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              className="avatar-text avatar-sm border-0 bg-transparent"
              data-bs-toggle="dropdown"
              type="button"
            >
              <i className="feather-more-vertical"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" type="button">
                  <i className="feather-check-circle me-3"></i>
                  Mark as Read/Unread
                </button>
              </li>

              <li>
                <button className="dropdown-item" type="button">
                  <i className="feather-trash-2 me-3"></i>
                  Delete Conversation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p
          className={`fs-12 mt-2 mb-0 text-truncate-2-line ${
            item.unread ? "fw-semibold text-dark" : "text-muted"
          }`}
        >
          {lorem}
        </p>
      </div>
    </div>
  );
};

const ConversationList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedConversation = conversations.find(
    (item) => String(item.id) === id,
  );

  return (
    <div>
      <main className="nxl-container apps-container apps-chat">
        <div className="nxl-content without-header nxl-full-content">
          <div className="main-content d-flex">
            {/* [ Content Sidebar ] start */}
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
                  {conversations.map((item) => (
                    <ConversationItem
                      key={item.id}
                      item={item}
                      isSelected={String(item.id) === id}
                      onClick={() => navigate(`/conversations/${item.id}`)}
                    />
                  ))}
                </div>
              </div>
              <a
                href="javascript:void(0);"
                className="content-sidebar-footer px-4 py-3 fs-11 text-uppercase d-block text-center"
              >
                Load More
              </a>
            </div>
            {id && <ChatWindow selectedConversation={selectedConversation} />}
            {/* [ Content Sidebar ] end */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConversationList;
