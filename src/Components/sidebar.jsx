import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen = true }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleDropdown = (menu) => {
    setOpenMenus((current) => ({ ...current, [menu]: !current[menu] }));
  };

  return (
    <nav
      className={`nxl-navigation${isOpen ? " mob-navigation-active" : ""}`}
      style={{ transform: isOpen ? undefined : "translateX(-100%)" }}
    >
      <div className="navbar-wrapper">
        <div className="m-header">
          <Link
            to="/"
            className={`b-brand bytes-chat-brand${isOpen ? "" : " bytes-chat-brand--collapsed"}`}
            aria-label="Bytes Chat"
            title="Bytes Chat"
          >
            <span className="bytes-chat-brand__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8 8 0 0 1-7.1 4.2 8.38 8.38 0 0 1-3.8-.9L3 21l2.4-6.2a8.38 8.38 0 0 1-.9-3.8 8 8 0 0 1 4.2-7.1 8.38 8.38 0 0 1 3.8-.9h.5a8 8 0 0 1 8 8z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="bytes-chat-brand__name">Bytes Chat</span>
          </Link>
        </div>

        <div className="navbar-content">
          <ul className="nxl-navbar">
            <li className="nxl-item nxl-caption">
              <label>Navigation</label>
            </li>
            <li
              className={`nxl-item nxl-hasmenu${openMenus.dashboards ? " nxl-trigger" : ""}`}
            >
              <a
                href="#"
                className="nxl-link"
                aria-expanded={Boolean(openMenus.dashboards)}
                onClick={(event) => {
                  event.preventDefault();
                  toggleDropdown("dashboards");
                }}
              >
                <span className="nxl-micon">
                  <i className="feather-airplay"></i>
                </span>
                <span className="nxl-mtext">Dashboards</span>
                <span className="nxl-arrow">
                  <i className="feather-chevron-right"></i>
                </span>
              </a>
              <ul className="nxl-submenu">
                <li className="nxl-item">
                  <Link className="nxl-link" to="/analytics">
                    Analytics
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`nxl-item nxl-hasmenu${openMenus.applications ? " nxl-trigger" : ""}`}
            >
              <Link
                to="#"
                className="nxl-link"
                aria-expanded={Boolean(openMenus.applications)}
                onClick={(event) => {
                  event.preventDefault();
                  toggleDropdown("applications");
                }}
              >
                <span className="nxl-micon">
                  <i className="feather-send"></i>
                </span>
                <span className="nxl-mtext">Applications</span>
                <span className="nxl-arrow">
                  <i className="feather-chevron-right"></i>
                </span>
              </Link>
              <ul className="nxl-submenu">
                <li className="nxl-item">
                  <Link className="nxl-link" to="/conversation">
                    Conversations
                  </Link>
                </li>
                <li className="nxl-item">
                  <Link className="nxl-link" to="/ticket">
                    Tickets
                  </Link>
                </li>
              
              </ul>
            </li>
            <li
              className={`nxl-item nxl-hasmenu${openMenus.customers ? " nxl-trigger" : ""}`}
            >
              <Link
                to="#"
                className="nxl-link"
                aria-expanded={Boolean(openMenus.customers)}
                onClick={(event) => {
                  event.preventDefault();
                  toggleDropdown("customers");
                }}
              >
                <span className="nxl-micon">
                  <i className="feather-users"></i>
                </span>
                <span className="nxl-mtext">People</span>
                <span className="nxl-arrow">
                  <i className="feather-chevron-right"></i>
                </span>
              </Link>
              <ul className="nxl-submenu">
                <li className="nxl-item">
                  <Link className="nxl-link" to="/customer">
                    Customers
                  </Link>
                </li>
                <li className="nxl-item">
                  <Link className="nxl-link" to="/agent">
                    Agents
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* <div className="card text-center">
            <div className="card-body">
              <i className="feather-sunrise fs-4 text-dark"></i>
              <h6 className="mt-4 text-dark fw-bolder">Downloading Center</h6>
              <p className="fs-11 my-3 text-dark">
                Duralux is a production ready CRM to get started up and running
                easily.
              </p>
              <a
                href="javascript:void(0);"
                className="btn btn-primary text-dark w-100"
              >
                Download Now
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
