import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen = true }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleDropdown = (menu) => {
    setOpenMenus((current) => ({ ...current, [menu]: !current[menu] }));
  };

  return (
    <>
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
                    <a className="nxl-link" href="index.html">
                      CRM
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="analytics.html">
                      Analytics
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.reports ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.reports)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("reports");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-cast"></i>
                  </span>
                  <span className="nxl-mtext">Reports</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="reports-sales.html">
                      Sales Report
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="reports-leads.html">
                      Leads Report
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="reports-project.html">
                      Project Report
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="reports-timesheets.html">
                      Timesheets Report
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.applications ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
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
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/chat">
                      Chat
                    </Link>
                  </li>
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/email">
                      Email
                    </Link>
                  </li>
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/tasks">
                      Tasks
                    </Link>
                  </li>
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/notes">
                      Notes
                    </Link>
                  </li>
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/storage">
                      Storage
                    </Link>
                  </li>
                  <li className="nxl-item">
                    <Link className="nxl-link" to="/calendar">
                      Calendar
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.proposal ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.proposal)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("proposal");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-at-sign"></i>
                  </span>
                  <span className="nxl-mtext">Proposal</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="proposal.html">
                      Proposal
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="proposal-view.html">
                      Proposal View
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="proposal-edit.html">
                      Proposal Edit
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="proposal-create.html">
                      Proposal Create
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.payment ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.payment)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("payment");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-dollar-sign"></i>
                  </span>
                  <span className="nxl-mtext">Payment</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="payment.html">
                      Payment
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="invoice-view.html">
                      Invoice View
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="invoice-create.html">
                      Invoice Create
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.customers ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
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
                  <span className="nxl-mtext">Customers</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="customers.html">
                      Customers
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="customers-view.html">
                      Customers View
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="customers-create.html">
                      Customers Create
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.leads ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.leads)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("leads");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-alert-circle"></i>
                  </span>
                  <span className="nxl-mtext">Leads</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="leads.html">
                      Leads
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="leads-view.html">
                      Leads View
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="leads-create.html">
                      Leads Create
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.projects ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.projects)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("projects");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-briefcase"></i>
                  </span>
                  <span className="nxl-mtext">Projects</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="projects.html">
                      Projects
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="projects-view.html">
                      Projects View
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="projects-create.html">
                      Projects Create
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.widgets ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.widgets)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("widgets");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-layout"></i>
                  </span>
                  <span className="nxl-mtext">Widgets</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="widgets-lists.html">
                      Lists
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="widgets-tables.html">
                      Tables
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="widgets-charts.html">
                      Charts
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="widgets-statistics.html">
                      Statistics
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="widgets-miscellaneous.html">
                      Miscellaneous
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.settings ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.settings)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("settings");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-settings"></i>
                  </span>
                  <span className="nxl-mtext">Settings</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-general.html">
                      General
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-seo.html">
                      SEO
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-tags.html">
                      Tags
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-email.html">
                      Email
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-tasks.html">
                      Tasks
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-leads.html">
                      Leads
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-support.html">
                      Support
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-finance.html">
                      Finance
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-gateways.html">
                      Gateways
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-customers.html">
                      Customers
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-localization.html">
                      Localization
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-recaptcha.html">
                      reCAPTCHA
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="settings-miscellaneous.html">
                      Miscellaneous
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.authentication ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.authentication)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("authentication");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-power"></i>
                  </span>
                  <span className="nxl-mtext">Authentication</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.login ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.login)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("login");
                      }}
                    >
                      <span className="nxl-mtext">Login</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-login-cover.html">
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-login-minimal.html"
                        >
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-login-creative.html"
                        >
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.register ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.register)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("register");
                      }}
                    >
                      <span className="nxl-mtext">Register</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-register-cover.html"
                        >
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-register-minimal.html"
                        >
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-register-creative.html"
                        >
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.error404 ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.error404)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("error404");
                      }}
                    >
                      <span className="nxl-mtext">Error-404</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-404-cover.html">
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-404-minimal.html">
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-404-creative.html">
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.resetPass ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.resetPass)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("resetPass");
                      }}
                    >
                      <span className="nxl-mtext">Reset Pass</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-reset-cover.html">
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-reset-minimal.html"
                        >
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-reset-creative.html"
                        >
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.verifyOtp ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.verifyOtp)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("verifyOtp");
                      }}
                    >
                      <span className="nxl-mtext">Verify OTP</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a className="nxl-link" href="./auth-verify-cover.html">
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-verify-minimal.html"
                        >
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-verify-creative.html"
                        >
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`nxl-item nxl-hasmenu${openMenus.maintenance ? " nxl-trigger" : ""}`}
                  >
                    <a
                      href="#"
                      className="nxl-link"
                      aria-expanded={Boolean(openMenus.maintenance)}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDropdown("maintenance");
                      }}
                    >
                      <span className="nxl-mtext">Maintenance</span>
                      <span className="nxl-arrow">
                        <i className="feather-chevron-right"></i>
                      </span>
                    </a>
                    <ul className="nxl-submenu">
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-maintenance-cover.html"
                        >
                          Cover
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-maintenance-minimal.html"
                        >
                          Minimal
                        </a>
                      </li>
                      <li className="nxl-item">
                        <a
                          className="nxl-link"
                          href="./auth-maintenance-creative.html"
                        >
                          Creative
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li
                className={`nxl-item nxl-hasmenu${openMenus.helpCenter ? " nxl-trigger" : ""}`}
              >
                <a
                  href="#"
                  className="nxl-link"
                  aria-expanded={Boolean(openMenus.helpCenter)}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleDropdown("helpCenter");
                  }}
                >
                  <span className="nxl-micon">
                    <i className="feather-life-buoy"></i>
                  </span>
                  <span className="nxl-mtext">Help Center</span>
                  <span className="nxl-arrow">
                    <i className="feather-chevron-right"></i>
                  </span>
                </a>
                <ul className="nxl-submenu">
                  <li className="nxl-item">
                    <a
                      className="nxl-link"
                      href="https://themeforest.net/user/flexilecode"
                    >
                      Support
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="help-knowledgebase.html">
                      KnowledgeBase
                    </a>
                  </li>
                  <li className="nxl-item">
                    <a className="nxl-link" href="#">
                      Documentations
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="card text-center">
              <div className="card-body">
                <i className="feather-sunrise fs-4 text-dark"></i>
                <h6 className="mt-4 text-dark fw-bolder">Downloading Center</h6>
                <p className="fs-11 my-3 text-dark">
                  Duralux is a production ready CRM to get started up and
                  running easily.
                </p>
                <a
                  href="javascript:void(0);"
                  className="btn btn-primary text-dark w-100"
                >
                  Download Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
