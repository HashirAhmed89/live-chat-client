import { Link } from "react-router-dom";
const Navbar = ({ isSidebarOpen, onSidebarToggle }) => {
  return (
    <>
      <header
        className="nxl-header"
        style={{ zIndex: isSidebarOpen ? 1027 : undefined }}
      >
        <div className="header-wrapper">
          {/* <!--! [Start] Header Left !--> */}
          <div className="header-left d-flex align-items-center gap-4">
            {/* <!--! [Start] nxl-head-mobile-toggler !--> */}
            <a
              href="#"
              className="nxl-head-mobile-toggler"
              id="mobile-collapse"
              onClick={(event) => {
                event.preventDefault();
                onSidebarToggle();
              }}
            >
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </a>
            {/* <!--! [Start] nxl-head-mobile-toggler !-->
                <!--! [Start] nxl-navigation-toggle !--> */}
            <div className="nxl-navigation-toggle">
              <a
                href="#"
                id="menu-mini-button"
                style={{ display: isSidebarOpen ? undefined : "none" }}
                onClick={(event) => {
                  event.preventDefault();
                  onSidebarToggle();
                }}
              >
                <i className="feather-align-left"></i>
              </a>
              <a
                href="#"
                id="menu-expend-button"
                style={{ display: isSidebarOpen ? "none" : undefined }}
                onClick={(event) => {
                  event.preventDefault();
                  onSidebarToggle();
                }}
              >
                <i className="feather-arrow-right"></i>
              </a>
            </div>
            {/* <!--! [End] nxl-navigation-toggle !-->
                <!--! [Start] nxl-lavel-mega-menu-toggle !--> */}
            <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
              <Link to="javascript:void(0);" id="nxl-lavel-mega-menu-open">
                <i className="feather-align-left"></i>
              </Link>
            </div>
            {/* <!--! [End] nxl-lavel-mega-menu-toggle !-->
                <!--! [Start] nxl-lavel-mega-menu !--> */}
            <div className="nxl-drp-link nxl-lavel-mega-menu">
              <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                <Link to="javascript:void(0)" id="nxl-lavel-mega-menu-hide">
                  <i className="feather-arrow-left me-2"></i>
                  <span>Back</span>
                </Link>
              </div>
              {/* <!--! [Start] nxl-lavel-mega-menu-wrapper !--> */}
              <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                {/* <!--! [Start] nxl-lavel-menu !--> */}
                <div className="dropdown nxl-h-item nxl-lavel-menu">
                  <Link
                    to="javascript:void(0);"
                    className="avatar-text avatar-md bg-primary text-white"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="feather-plus"></i>
                  </Link>
                  <div className="dropdown-menu nxl-h-dropdown">
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-send"></i>
                          <span>applications</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/chat" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Chat</span>
                        </Link>
                        <Link to="/email" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Email</span>
                        </Link>
                        <Link to="/tasks" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Tasks</span>
                        </Link>
                        <Link to="/notes" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Notes</span>
                        </Link>
                        <Link to="/storage" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Storage</span>
                        </Link>
                        <Link to="/calendar" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Calendar</span>
                        </Link>
                        <Link to="/contacts" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Contacts</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-cast"></i>
                          <span>Reports</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/reports-sales" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Sales Report</span>
                        </Link>
                        <Link to="/reports-leads" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Leads Report</span>
                        </Link>
                        <Link
                          to="/reports-project"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Project Report</span>
                        </Link>
                        <Link
                          to="/reports-timesheets"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Timesheets Report</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-at-sign"></i>
                          <span>Proposal</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/proposal" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Proposal</span>
                        </Link>
                        <Link to="/proposal-view" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Proposal View</span>
                        </Link>
                        <Link to="/proposal-edit" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Proposal Edit</span>
                        </Link>
                        <Link
                          to="/proposal-create"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Proposal Create</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-dollar-sign"></i>
                          <span>Payment</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/payment" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Payment</span>
                        </Link>
                        <Link to="/invoice-view" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Invoice View</span>
                        </Link>
                        <Link
                          to="/invoice-create"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Invoice Create</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-users"></i>
                          <span>Customers</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/customers" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Customers</span>
                        </Link>
                        <Link
                          to="/customers-view"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Customers View</span>
                        </Link>
                        <Link
                          to="/customers-create"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Customers Create</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-alert-circle"></i>
                          <span>Leads</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/leads" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Leads</span>
                        </Link>
                        <Link to="/leads-view" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Leads View</span>
                        </Link>
                        <Link to="/leads-create" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Leads Create</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-briefcase"></i>
                          <span>Projects</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/projects" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Projects</span>
                        </Link>
                        <Link to="/projects-view" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Projects View</span>
                        </Link>
                        <Link
                          to="/projects-create"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Projects Create</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-layout"></i>
                          <span>Widgets</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <Link to="/widgets-lists" className="dropdown-item">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Lists</span>
                        </Link>
                        <Link
                          to="/widgets-tables"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Tables</span>
                        </Link>
                        <Link
                          to="/widgets-charts"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Charts</span>
                        </Link>
                        <Link
                          to="/widgets-statistics"
                          className="dropdown-item"
                        >
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Statistics</span>
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown nxl-level-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="feather-power"></i>
                          <span>authentication</span>
                        </span>
                        <i className="feather-chevron-right ms-auto me-0"></i>
                      </Link>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Login</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-login-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-login-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-login-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Register</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-register-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-register-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-register-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Error-404</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-404-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-404-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-404-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Reset Pass</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-reset-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-reset-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-reset-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Verify OTP</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-verify-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-verify-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-verify-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown nxl-level-menu">
                          <Link
                            to="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <span className="hstack">
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Maintenance</span>
                            </span>
                            <i className="feather-chevron-right ms-auto me-0"></i>
                          </Link>
                          <div className="dropdown-menu nxl-h-dropdown">
                            <Link
                              to="/auth-maintenance-cover"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Cover</span>
                            </Link>
                            <Link
                              to="/auth-maintenance-minimal"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Minimal</span>
                            </Link>
                            <Link
                              to="/auth-maintenance-creative"
                              className="dropdown-item"
                            >
                              <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                              <span>Creative</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="javascript:void(0);" className="dropdown-item">
                      <i className="feather-plus"></i>
                      <span>add New Items</span>
                    </Link>
                  </div>
                </div>
                {/* <!--! [End] nxl-lavel-menu !-->
                        <!--! [Start] nxl-h-item nxl-mega-menu !--> */}
                <div className="dropdown nxl-h-item nxl-mega-menu">
                  <Link
                    to="javascript:void(0);"
                    className="btn btn-light-brand"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    {" "}
                    Mega Menu{" "}
                  </Link>
                  <div
                    className="dropdown-menu nxl-h-dropdown"
                    id="mega-menu-dropdown"
                  >
                    <div className="d-lg-flex align-items-start">
                      {/* <!--! [Start] nxl-mega-menu-tabs !--> */}
                      <div
                        className="nav flex-column nxl-mega-menu-tabs"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <button
                          className="nav-link active nxl-mega-menu-sm"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-general"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-airplay"></i>
                          </span>
                          <span className="menu-title">General</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                        <button
                          className="nav-link nxl-mega-menu-md"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-applications"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-send"></i>
                          </span>
                          <span className="menu-title">applications</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                        <button
                          className="nav-link nxl-mega-menu-lg"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-integrations"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-link-2"></i>
                          </span>
                          <span className="menu-title">Integrations</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                        <button
                          className="nav-link nxl-mega-menu-xl"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-components"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-layers"></i>
                          </span>
                          <span className="menu-title">Components</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                        <button
                          className="nav-link nxl-mega-menu-xxl"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-authentication"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-cpu"></i>
                          </span>
                          <span className="menu-title">authentication</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                        <button
                          className="nav-link nxl-mega-menu-full"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-miscellaneous"
                          type="button"
                          role="tab"
                        >
                          <span className="menu-icon">
                            <i className="feather-bluetooth"></i>
                          </span>
                          <span className="menu-title">Miscellaneous</span>
                          <span className="menu-arrow">
                            <i className="feather-chevron-right"></i>
                          </span>
                        </button>
                      </div>
                      {/* <!--! [End] nxl-mega-menu-tabs !-->
                                    <!--! [Start] nxl-mega-menu-tabs-content !--> */}
                      <div className="tab-content nxl-mega-menu-tabs-content">
                        {/* <!--! [Start] v-pills-general !--> */}
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-general"
                          role="tabpanel"
                        >
                          <div className="mb-4 rounded-3 border">
                            <img
                              src={
                                new URL(
                                  "../assets copy/images/banner/mockup.png",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid rounded-3"
                            />
                          </div>
                          <h6 className="fw-bolder">
                            Duralux - admin Dashboard UiKit
                          </h6>
                          <p className="fs-12 fw-normal text-muted text-truncate-3-line">
                            Get started Duralux with Duralux up and running.
                            Duralux bootstrap template docs helps you to get
                            started with simple html codes.
                          </p>
                          <Link
                            to="javascript:void(0);"
                            className="fs-13 fw-bold text-primary"
                          >
                            Get Started &rarr;
                          </Link>
                        </div>
                        {/* <!--! [End] v-pills-general !-->
                                        <!--! [Start] v-pills-applications !--> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-applications"
                          role="tabpanel"
                        >
                          <div className="row g-4">
                            <div className="col-lg-6">
                              <h6 className="dropdown-item-title">
                                applications
                              </h6>
                              <Link
                                to="/chat"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Chat</span>
                              </Link>
                              <Link
                                to="/email"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Email</span>
                              </Link>
                              <Link
                                to="/tasks"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Tasks</span>
                              </Link>
                              <Link
                                to="/notes"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Notes</span>
                              </Link>
                              <Link
                                to="/storage"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Storage</span>
                              </Link>
                              <Link
                                to="/calendar"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Calendar</span>
                              </Link>
                              <Link
                                to="/contacts"
                                className="dropdown-item"
                              >
                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                <span>Contacts</span>
                              </Link>
                            </div>
                            <div className="col-lg-6">
                              <div className="nxl-mega-menu-image">
                                <img
                                  src={
                                    new URL(
                                      "../assets copy/images/general/full-avatar.png",
                                      import.meta.url,
                                    ).href
                                  }
                                  alt=""
                                  className="img-fluid full-user-avtar"
                                />
                              </div>
                            </div>
                          </div>
                          <hr className="border-top-dashed" />
                          <div className="d-lg-flex align-items-center justify-content-between">
                            <div>
                              <h6 className="menu-item-heading text-truncate-1-line">
                                Need more application?
                              </h6>
                              <p className="fs-12 text-muted mb-0 text-truncate-3-line">
                                We are ready to build custom applications.
                              </p>
                            </div>
                            <div className="mt-2 mt-lg-0">
                              <Link
                                to="mailto:flexilecode@gmail.com"
                                className="fs-13 fw-bold text-primary"
                              >
                                Contact Us &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* <!--! [End] v-pills-applications !-->
                                        <!--! [Start] v-pills-integrations !--> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-integrations"
                          role="tabpanel"
                        >
                          <div className="row g-lg-4 nxl-mega-menu-integrations">
                            <div className="col-lg-12 d-lg-flex align-items-center justify-content-between mb-4 mb-lg-0">
                              <div>
                                <h6 className="fw-bolder text-dark">
                                  Integrations
                                </h6>
                                <p className="fs-12 text-muted mb-0">
                                  Connect amazing apps on your bucket.
                                </p>
                              </div>
                              <div className="mt-2 mt-lg-0">
                                <Link
                                  to="javascript:void(0);"
                                  className="fs-13 text-primary"
                                >
                                  add New &rarr;
                                </Link>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/app-store.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">app Store</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/spotify.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Spotify</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/figma.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Figma</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/shopify.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Shopify</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/paypal.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Paypal</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                            </div>
                            <div className="col-lg-4">
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/gmail.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Gmail</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/dropbox.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Dropbox</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/google-drive.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">
                                  Google Drive
                                </div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/github.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Github</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/gitlab.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Gitlab</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                            </div>
                            <div className="col-lg-4">
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/facebook.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Facebook</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/pinterest.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Pinterest</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/instagram.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Instagram</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/twitter.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Twitter</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                              <Link
                                to="javascript:void(0);"
                                className="dropdown-item"
                              >
                                <div className="menu-item-icon">
                                  <img
                                    src={
                                      new URL(
                                        "../assets copy/images/brand/youtube.png",
                                        import.meta.url,
                                      ).href
                                    }
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="menu-item-title">Youtube</div>
                                <div className="menu-item-arrow">
                                  <i className="feather-arrow-right"></i>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <hr className="border-top-dashed" />
                          <p className="fs-13 text-muted mb-0">
                            Need help? Contact our{" "}
                            <Link
                              to="javascript:void(0);"
                              className="fst-italic"
                            >
                              support center
                            </Link>
                          </p>
                        </div>
                        {/* <!--! [End] v-pills-integrations !-->
                                        <!--! [Start] v-pills-components !--> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-components"
                          role="tabpanel"
                        >
                          <div className="row g-4 align-items-center">
                            <div className="col-xl-8">
                              <div className="row g-4">
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">
                                    Navigation
                                  </h6>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    CRM
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    analytics
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Sales
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Leads
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Projects
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Timesheets
                                  </Link>
                                </div>
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">Pages</h6>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Leads{" "}
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Payments
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Projects
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Proposals
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Customers
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Documentations
                                  </Link>
                                </div>
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">
                                    authentication
                                  </h6>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Login
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Regiser
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Error-404
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Reset Pass
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Verify OTP
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Maintenance
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div className="nxl-mega-menu-image">
                                <img
                                  src={
                                    new URL(
                                      "../assets copy/images/banner/1.jpg",
                                      import.meta.url,
                                    ).href
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="mt-4">
                                <Link
                                  to="mailto:flexilecode@gmail.com"
                                  className="fs-13 fw-bold"
                                >
                                  View all resources on Duralux &rarr;
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--! [End] v-pills-components !-->
                                        <!--! [Start] v-pills-authentication !--> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-authentication"
                          role="tabpanel"
                        >
                          <div className="row g-4 align-items-center nxl-mega-menu-authentication">
                            <div className="col-xl-8">
                              <div className="row g-4">
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">Cover</h6>
                                  <Link
                                    to="/auth-login-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Login</span>
                                  </Link>
                                  <Link
                                    to="/auth-register-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Register</span>
                                  </Link>
                                  <Link
                                    to="/auth-404-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Error-404</span>
                                  </Link>
                                  <Link
                                    to="/auth-reset-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Reset Pass</span>
                                  </Link>
                                  <Link
                                    to="/auth-verify-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Verify OTP</span>
                                  </Link>
                                  <Link
                                    to="/auth-maintenance-cover"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Maintenance</span>
                                  </Link>
                                </div>
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">
                                    Minimal
                                  </h6>
                                  <Link
                                    to="/auth-login-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Login</span>
                                  </Link>
                                  <Link
                                    to="/auth-register-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Register</span>
                                  </Link>
                                  <Link
                                    to="/auth-404-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Error-404</span>
                                  </Link>
                                  <Link
                                    to="/auth-reset-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Reset Pass</span>
                                  </Link>
                                  <Link
                                    to="/auth-verify-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Verify OTP</span>
                                  </Link>
                                  <Link
                                    to="/auth-maintenance-minimal"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Maintenance</span>
                                  </Link>
                                </div>
                                <div className="col-lg-4">
                                  <h6 className="dropdown-item-title">
                                    Creative
                                  </h6>
                                  <Link
                                    to="/auth-login-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Login</span>
                                  </Link>
                                  <Link
                                    to="/auth-register-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Register</span>
                                  </Link>
                                  <Link
                                    to="/auth-404-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Error-404</span>
                                  </Link>
                                  <Link
                                    to="/auth-reset-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Reset Pass</span>
                                  </Link>
                                  <Link
                                    to="/auth-verify-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Verify OTP</span>
                                  </Link>
                                  <Link
                                    to="/auth-maintenance-creative"
                                    className="dropdown-item"
                                  >
                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                    <span>Maintenance</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div
                                id="carouselResourcesCaptions"
                                className="carousel slide"
                                data-bs-ride="carousel"
                              >
                                <div className="carousel-indicators">
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                  ></button>
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="1"
                                  ></button>
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="2"
                                  ></button>
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="3"
                                  ></button>
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="4"
                                  ></button>
                                  <button
                                    type="button"
                                    data-bs-target="#carouselResourcesCaptions"
                                    data-bs-slide-to="5"
                                  ></button>
                                </div>
                                <div className="carousel-inner rounded-3">
                                  <div className="carousel-item active">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/6.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        Shopify eCommerce Store
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the first slide.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="carousel-item">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/5.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        iOS apps Development
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the second slide.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="carousel-item">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/4.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        Figma Dashboard Design
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the third slide.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="carousel-item">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/3.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        React Dashboard Design
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the third slide.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="carousel-item">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/2.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        Standup Team Meeting
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the third slide.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="carousel-item">
                                    <div className="nxl-mega-menu-image">
                                      <img
                                        src={
                                          new URL(
                                            "../assets copy/images/banner/1.jpg",
                                            import.meta.url,
                                          ).href
                                        }
                                        alt=""
                                        className="img-fluid d-block w-100"
                                      />
                                    </div>
                                    <div className="carousel-caption">
                                      <h5 className="carousel-caption-title text-truncate-1-line">
                                        Zoom Team Meeting
                                      </h5>
                                      <p className="carousel-caption-desc">
                                        Some representative placeholder content
                                        for the third slide.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselResourcesCaptions"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">
                                    Previous
                                  </span>
                                </button>
                                <button
                                  className="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselResourcesCaptions"
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--! [End] v-pills-authentication !-->
                                        <!--! [Start] v-pills-miscellaneous !--> */}
                        <div
                          className="tab-pane fade nxl-mega-menu-miscellaneous"
                          id="v-pills-miscellaneous"
                          role="tabpanel"
                        >
                          {/* <!-- Nav tabs --> */}
                          <ul
                            className="nav nav-tabs flex-column flex-lg-row nxl-mega-menu-miscellaneous-tabs"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#v-pills-projects"
                                type="button"
                                role="tab"
                              >
                                <span className="menu-icon">
                                  <i className="feather-cast"></i>
                                </span>
                                <span className="menu-title">Projects</span>
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#v-pills-services"
                                type="button"
                                role="tab"
                              >
                                <span className="menu-icon">
                                  <i className="feather-check-square"></i>
                                </span>
                                <span className="menu-title">Services</span>
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#v-pills-features"
                                type="button"
                                role="tab"
                              >
                                <span className="menu-icon">
                                  <i className="feather-airplay"></i>
                                </span>
                                <span className="menu-title">Features</span>
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#v-pills-blogs"
                                type="button"
                                role="tab"
                              >
                                <span className="menu-icon">
                                  <i className="feather-bold"></i>
                                </span>
                                <span className="menu-title">Blogs</span>
                              </button>
                            </li>
                          </ul>
                          {/* <!-- Tab panes --> */}
                          <div className="tab-content nxl-mega-menu-miscellaneous-content">
                            <div
                              className="tab-pane fade active show"
                              id="v-pills-projects"
                              role="tabpanel"
                            >
                              <div className="row g-4">
                                <div className="col-xxl-2 d-lg-none d-xxl-block">
                                  <h6 className="dropdown-item-title">
                                    Categories
                                  </h6>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Support
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Services
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    applicatios
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    eCommerce
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Development
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Miscellaneous
                                  </Link>
                                </div>
                                <div className="col-xxl-10">
                                  <div className="row g-4">
                                    <div className="col-xl-6">
                                      <div className="d-lg-flex align-items-center gap-3">
                                        <div className="wd-150 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/1.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3"
                                          />
                                        </div>
                                        <div className="mt-3 mt-lg-0 ms-lg-3 item-text">
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Shopify eCommerce Store
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Sint
                                            nam ullam iure eum sed rerum libero
                                            quis doloremque maiores veritatis?
                                          </p>
                                          <div className="hstack gap-2 mt-3">
                                            <div className="avatar-image avatar-sm">
                                              <img
                                                src={
                                                  new URL(
                                                    "../assets copy/images/avatar/1.png",
                                                    import.meta.url,
                                                  ).href
                                                }
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </div>
                                            <Link
                                              to="javascript:void(0);"
                                              className="fs-12"
                                            >
                                              alexandra Della
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xl-6">
                                      <div className="d-lg-flex align-items-center gap-3">
                                        <div className="wd-150 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/2.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3"
                                          />
                                        </div>
                                        <div className="mt-3 mt-lg-0 ms-lg-3 item-text">
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              iOS apps Development
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Sint
                                            nam ullam iure eum sed rerum libero
                                            quis doloremque maiores veritatis?
                                          </p>
                                          <div className="hstack gap-2 mt-3">
                                            <div className="avatar-image avatar-sm">
                                              <img
                                                src={
                                                  new URL(
                                                    "../assets copy/images/avatar/2.png",
                                                    import.meta.url,
                                                  ).href
                                                }
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </div>
                                            <Link
                                              to="javascript:void(0);"
                                              className="fs-12"
                                            >
                                              Green Cute
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xl-6">
                                      <div className="d-lg-flex align-items-center gap-3">
                                        <div className="wd-150 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/3.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3"
                                          />
                                        </div>
                                        <div className="mt-3 mt-lg-0 ms-lg-3 item-text">
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Figma Dashboard Design
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Sint
                                            nam ullam iure eum sed rerum libero
                                            quis doloremque maiores veritatis?
                                          </p>
                                          <div className="hstack gap-2 mt-3">
                                            <div className="avatar-image avatar-sm">
                                              <img
                                                src={
                                                  new URL(
                                                    "../assets copy/images/avatar/3.png",
                                                    import.meta.url,
                                                  ).href
                                                }
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </div>
                                            <Link
                                              to="javascript:void(0);"
                                              className="fs-12"
                                            >
                                              Malanie Hanvey
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xl-6">
                                      <div className="d-lg-flex align-items-center gap-3">
                                        <div className="wd-150 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/4.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3"
                                          />
                                        </div>
                                        <div className="mt-3 mt-lg-0 ms-lg-3 item-text">
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              React Dashboard Design
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Sint
                                            nam ullam iure eum sed rerum libero
                                            quis doloremque maiores veritatis?
                                          </p>
                                          <div className="hstack gap-2 mt-3">
                                            <div className="avatar-image avatar-sm">
                                              <img
                                                src={
                                                  new URL(
                                                    "../assets copy/images/avatar/4.png",
                                                    import.meta.url,
                                                  ).href
                                                }
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </div>
                                            <Link
                                              to="javascript:void(0);"
                                              className="fs-12"
                                            >
                                              Kenneth Hune
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="v-pills-services"
                              role="tabpanel"
                            >
                              <div className="row g-4 nxl-mega-menu-miscellaneous-services">
                                <div className="col-xl-8">
                                  <div className="row g-4">
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-primary text-white">
                                          <i className="feather-bar-chart-2 mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              analytics Services
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-danger text-white">
                                          <i className="feather-feather mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Content Writing
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-warning text-white">
                                          <i className="feather-bell mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              SEO (Search Engine Optimization)
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-success text-white">
                                          <i className="feather-shield mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Security Services
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-teal text-white">
                                          <i className="feather-shopping-cart mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              eCommerce Services
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg rounded bg-dark text-white">
                                          <i className="feather-life-buoy mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Support Services
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="p-3 bg-soft-dark text-dark rounded d-lg-flex align-items-center justify-content-between">
                                        <div className="fs-13">
                                          <i className="feather-star me-2"></i>
                                          <span>
                                            View all services on Duralux.
                                          </span>
                                        </div>
                                        <div className="mt-2 mt-lg-0">
                                          <Link
                                            to="javascript:void(0);"
                                            className="fs-13 text-primary"
                                          >
                                            Learn More &rarr;
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-4">
                                  <div
                                    id="carouselServicesCaptions"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                  >
                                    <div className="carousel-indicators">
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                      ></button>
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="1"
                                      ></button>
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="2"
                                      ></button>
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="3"
                                      ></button>
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="4"
                                      ></button>
                                      <button
                                        type="button"
                                        data-bs-target="#carouselServicesCaptions"
                                        data-bs-slide-to="5"
                                      ></button>
                                    </div>
                                    <div className="carousel-inner rounded-3">
                                      <div className="carousel-item active">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/6.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            Shopify eCommerce Store
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the first slide.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="carousel-item">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/5.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            iOS apps Development
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the second slide.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="carousel-item">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/4.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            Figma Dashboard Design
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the third slide.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="carousel-item">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/3.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            React Dashboard Design
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the third slide.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="carousel-item">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/2.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            Standup Team Meeting
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the third slide.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="carousel-item">
                                        <div className="nxl-mega-menu-image">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/1.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid d-block w-100"
                                          />
                                        </div>
                                        <div className="carousel-caption">
                                          <h5 className="carousel-caption-title text-truncate-1-line">
                                            Zoom Team Meeting
                                          </h5>
                                          <p className="carousel-caption-desc">
                                            Some representative placeholder
                                            content for the third slide.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      className="carousel-control-prev"
                                      type="button"
                                      data-bs-target="#carouselServicesCaptions"
                                      data-bs-slide="prev"
                                    >
                                      <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                      ></span>
                                      <span className="visually-hidden">
                                        Previous
                                      </span>
                                    </button>
                                    <button
                                      className="carousel-control-next"
                                      type="button"
                                      data-bs-target="#carouselServicesCaptions"
                                      data-bs-slide="next"
                                    >
                                      <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                      ></span>
                                      <span className="visually-hidden">
                                        Next
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="v-pills-features"
                              role="tabpanel"
                            >
                              <div className="row g-4 nxl-mega-menu-miscellaneous-features">
                                <div className="col-xl-8">
                                  <div className="row g-4">
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-primary text-primary border-soft-primary rounded">
                                          <i className="feather-bell mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Notifications
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-danger text-danger border-soft-danger rounded">
                                          <i className="feather-bar-chart-2 mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              analytics
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-success text-success border-soft-success rounded">
                                          <i className="feather-link-2 mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Ingetrations
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-indigo text-indigo border-soft-indigo rounded">
                                          <i className="feather-book mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Documentations
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-warning text-warning border-soft-warning rounded">
                                          <i className="feather-shield mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Security
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-start gap-3">
                                        <div className="avatar-text avatar-lg bg-soft-teal text-teal border-soft-teal rounded">
                                          <i className="feather-life-buoy mx-auto"></i>
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Support
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit Unde
                                            numquam rem dignissimos. elit Unde
                                            numquam rem dignissimos.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 offset-xxl-1 col-xl-4">
                                  <div className="nxl-mega-menu-image">
                                    <img
                                      src={
                                        new URL(
                                          "../assets copy/images/banner/1.jpg",
                                          import.meta.url,
                                        ).href
                                      }
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="mt-4">
                                    <Link
                                      to="mailto:flexilecode@gmail.com"
                                      className="fs-13 fw-bold"
                                    >
                                      View all features on Duralux &rarr;
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="v-pills-blogs"
                              role="tabpanel"
                            >
                              <div className="row g-4">
                                <div className="col-xxl-2 d-lg-none d-xxl-block">
                                  <h6 className="dropdown-item-title">
                                    Categories
                                  </h6>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Support
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Services
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    applicatios
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    eCommerce
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Development
                                  </Link>
                                  <Link
                                    to="javascript:void(0);"
                                    className="dropdown-item"
                                  >
                                    Miscellaneous
                                  </Link>
                                </div>
                                <div className="col-xxl-10">
                                  <div className="row g-4">
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/1.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/2.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/3.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/4.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/5.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="wd-100 rounded-3">
                                          <img
                                            src={
                                              new URL(
                                                "../assets copy/images/banner/6.jpg",
                                                import.meta.url,
                                              ).href
                                            }
                                            alt=""
                                            className="img-fluid rounded-3 border border-3"
                                          />
                                        </div>
                                        <div>
                                          <Link to="javascript:void(0);">
                                            <h6 className="menu-item-heading text-truncate-1-line">
                                              Lorem ipsum dolor sit
                                            </h6>
                                          </Link>
                                          <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Eius
                                            dolor quo commodi nisi animi error
                                            minus quia aliquam.
                                          </p>
                                          <span className="fs-11 text-gray-500">
                                            26 March, 2023
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="p-3 bg-soft-dark text-dark rounded d-flex align-items-center justify-content-between gap-4">
                                        <div className="fs-13 text-truncate-1-line">
                                          <i className="feather-star me-2"></i>
                                          <strong>Version 2.3.2 is out!</strong>
                                          <span>
                                            Learn more about our news and
                                            schedule reporting.
                                          </span>
                                        </div>
                                        <div className="wd-100 text-end">
                                          <Link
                                            to="javascript:void(0);"
                                            className="fs-13 text-primary"
                                          >
                                            Learn More &rarr;
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--! [End] v-pills-miscellaneous !--> */}
                      </div>
                      {/* <!--! [End] nxl-mega-menu-tabs-content !--> */}
                    </div>
                  </div>
                </div>
                {/* <!--! [End] nxl-h-item nxl-mega-menu !--> */}
              </div>
              {/* <!--! [End] nxl-lavel-mega-menu-wrapper !--> */}
            </div>
            {/* <!--! [End] nxl-lavel-mega-menu !--> */}
          </div>
          {/* <!--! [End] Header Left !--> */}
          {/* <!--! [Start] Header Right !--> */}
          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">
              <div className="dropdown nxl-h-item nxl-header-search">
                <Link
                  to="javascript:void(0);"
                  className="nxl-head-link me-0"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  <i className="feather-search"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-dropdown">
                  <div className="input-group flex-nowrap search-form">
                    <span className="input-group-text">
                      <i className="feather-search fs-6 text-muted"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control search-input-field"
                      placeholder="Search..."
                    />

                    <span className="input-group-text">
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                      ></button>
                      {/* <span className="ms-1">ESC</span> */}
                    </span>
                  </div>

                  <div className="dropdown-divider mt-0"></div>

                  <div className="search-items-wrapper">
                    <div className="searching-for px-4 py-2">
                      <p className="fs-11 fw-medium text-muted">
                        I'm searching for...
                      </p>

                      <div className="d-flex flex-wrap gap-1">
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Projects
                        </Link> */}
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Leads
                        </Link> */}
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Contacts
                        </Link> */}
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Inbox
                        </Link> */}
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Invoices
                        </Link> */}
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Tasks
                        </Link> */}
                        <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Customers
                        </Link>
                        {/* <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Notes
                        </Link>
                        <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          affiliate
                        </Link>
                        <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Storage
                        </Link>
                        <Link
                          to="javascript:void(0);"
                          className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold"
                        >
                          Calendar
                        </Link> */}
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    {/* <div className="recent-result px-4 py-2">
                      <h4 className="fs-13 fw-normal text-gray-600 mb-3">
                        Recnet{" "}
                        <span className="badge small bg-gray-200 rounded ms-1 text-dark">
                          3
                        </span>
                      </h4>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-text rounded">
                            <i className="feather-airplay"></i>
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              CRM dashboard redesign
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              Home / project / crm
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link
                            to="javascript:void(0);"
                            className="badge border rounded text-dark"
                          >
                            /<i className="feather-command ms-1 fs-10"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-text rounded">
                            <i className="feather-file-plus"></i>
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Create new document
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              Home / tasks / docs
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link
                            to="javascript:void(0);"
                            className="badge border rounded text-dark"
                          >
                            N /<i className="feather-command ms-1 fs-10"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-text rounded">
                            <i className="feather-user-plus"></i>
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Invite project colleagues
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              Home / project / invite
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link
                            to="javascript:void(0);"
                            className="badge border rounded text-dark"
                          >
                            P /<i className="feather-command ms-1 fs-10"></i>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                    <div className="dropdown-divider my-3"></div>
                    {/* <div className="users-result px-4 py-2">
                      <h4 className="fs-13 fw-normal text-gray-600 mb-3">
                        Users{" "}
                        <span className="badge small bg-gray-200 rounded ms-1 text-dark">
                          5
                        </span>
                      </h4>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image rounded">
                            <img
                              src={new URL('../assets copy/images/avatar/1.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              alexandra Della
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              alex.della@outlook.com
                            </p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-chevron-right"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image rounded">
                            <img
                              src={new URL('../assets copy/images/avatar/2.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Green Cute
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              green.cute@outlook.com
                            </p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-chevron-right"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image rounded">
                            <img
                              src={new URL('../assets copy/images/avatar/3.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Malanie Hanvey
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              malanie.anvey@outlook.com
                            </p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-chevron-right"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image rounded">
                            <img
                              src={new URL('../assets copy/images/avatar/4.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Kenneth Hune
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              kenth.hune@outlook.com
                            </p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-chevron-right"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image rounded">
                            <img
                              src={new URL('../assets copy/images/avatar/5.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              archie Cantones
                            </Link>
                            <p className="fs-11 text-muted mb-0">
                              archie.cones@outlook.com
                            </p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-chevron-right"></i>
                        </Link>
                      </div>
                    </div> */}
                    <div className="dropdown-divider my-3"></div>
                    {/* <div className="file-result px-4 py-2">
                      <h4 className="fs-13 fw-normal text-gray-600 mb-3">
                        Files{" "}
                        <span className="badge small bg-gray-200 rounded ms-1 text-dark">
                          3
                        </span>
                      </h4>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image bg-gray-200 rounded">
                            <img
                              src={new URL('../assets copy/images/file-icons/css.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Project Style CSS
                            </Link>
                            <p className="fs-11 text-muted mb-0">05.74 MB</p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-download"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image bg-gray-200 rounded">
                            <img
                              src={new URL('../assets copy/images/file-icons/zip.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Dashboard Project Zip
                            </Link>
                            <p className="fs-11 text-muted mb-0">46.83 MB</p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-download"></i>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image bg-gray-200 rounded">
                            <img
                              src={new URL('../assets copy/images/file-icons/pdf.png', import.meta.url).href}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <Link
                              to="javascript:void(0);"
                              className="font-body fw-bold d-block mb-1"
                            >
                              Project Document PDF
                            </Link>
                            <p className="fs-11 text-muted mb-0">12.85 MB</p>
                          </div>
                        </div>
                        <Link
                          to="javascript:void(0);"
                          className="avatar-text avatar-md"
                        >
                          <i className="feather-download"></i>
                        </Link>
                      </div>
                    </div> */}
                    <div className="dropdown-divider mt-3 mb-0"></div>
                    <Link
                      to="javascript:void(0);"
                      className="p-3 fs-10 fw-bold text-uppercase text-center d-block"
                    >
                      Loar More
                    </Link>
                  </div>
                </div>
              </div>
              {/* language  */}
              {/* <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
                <Link
                  to="javascript:void(0);"
                  className="nxl-head-link me-0 nxl-language-link"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  <img
                    src={
                      new URL(
                        "../assets copy/vendors/img/flags/4x3/us.svg",
                        import.meta.url,
                      ).href
                    }
                    alt=""
                    className="img-fluid wd-20"
                  />
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-language-dropdown">
                  <div className="dropdown-divider mt-0"></div>
                  <div className="language-items-wrapper">
                    <div className="select-language px-4 py-2 hstack justify-content-between gap-4">
                      <div className="lh-lg">
                        <h6 className="mb-0">Select Language</h6>
                        <p className="fs-11 text-muted mb-0">
                          12 languages avaiable!
                        </p>
                      </div>
                      <Link
                        to="javascript:void(0);"
                        className="avatar-text avatar-md"
                        data-bs-toggle="tooltip"
                        title="add Language"
                      >
                        <i className="feather-plus"></i>
                      </Link>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="row px-4 pt-3">
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/sa.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>arabic</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/bd.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Bengali</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/ch.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Chinese</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/nl.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Dutch</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select active">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/us.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>English</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/fr.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>French</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/de.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>German</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/in.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Hindi</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/ru.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Russian</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/es.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Spanish</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/tr.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Turkish</span>
                        </Link>
                      </div>
                      <div className="col-sm-4 col-6 language_select">
                        <Link
                          to="javascript:void(0);"
                          className="d-flex align-items-center gap-2"
                        >
                          <div className="avatar-image avatar-sm">
                            <img
                              src={
                                new URL(
                                  "../assets copy/vendors/img/flags/1x1/pk.svg",
                                  import.meta.url,
                                ).href
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <span>Urdo</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="nxl-h-item d-none d-sm-flex">
                <div className="full-screen-switcher">
                  <Link
                    to="javascript:void(0);"
                    className="nxl-head-link me-0"
                    onClick={() =>
                      window.jQuery("body").fullScreenHelper("toggle")
                    }
                  >
                    <i className="feather-maximize maximize"></i>
                    <i className="feather-minimize minimize"></i>
                  </Link>
                </div>
              </div>
              <div className="nxl-h-item dark-light-theme">
                <Link
                  to="javascript:void(0);"
                  className="nxl-head-link me-0 dark-button"
                >
                  <i className="feather-moon"></i>
                </Link>
                <Link
                  to="javascript:void(0);"
                  className="nxl-head-link me-0 light-button"
                  style={{ display: "none" }}
                >
                  <i className="feather-sun"></i>
                </Link>
              </div>
              <div className="dropdown nxl-h-item">
                <Link
                  to="javascript:void(0);"
                  className="nxl-head-link me-0"
                  data-bs-toggle="dropdown"
                  role="button"
                  data-bs-auto-close="outside"
                >
                  <i className="feather-clock"></i>
                  <span className="badge bg-success nxl-h-badge">2</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu">
                  <div className="d-flex justify-content-between align-items-center timesheets-head">
                    <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                    <Link
                      to="javascript:void(0);"
                      className="fs-11 text-success text-end ms-auto"
                      data-bs-toggle="tooltip"
                      title="Upcomming Timers"
                    >
                      <i className="feather-clock"></i>
                      <span>3 Upcomming</span>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                    <i className="feather-clock fs-1 mb-4"></i>
                    <p className="text-muted">No started timers found yes!</p>
                    <Link
                      to="javascript:void(0);"
                      className="btn btn-sm btn-primary"
                    >
                      Started Timer
                    </Link>
                  </div>
                  <div className="text-center timesheets-footer">
                    <Link
                      to="javascript:void(0);"
                      className="fs-13 fw-semibold text-dark"
                    >
                      alls Timesheets
                    </Link>
                  </div>
                </div>
              </div>
              <div className="dropdown nxl-h-item">
                <Link
                  className="nxl-head-link me-3"
                  data-bs-toggle="dropdown"
                  to="#"
                  role="button"
                  data-bs-auto-close="outside"
                >
                  <i className="feather-bell"></i>
                  <span className="badge bg-danger nxl-h-badge">3</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                  <div className="d-flex justify-content-between align-items-center notifications-head">
                    <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                    <Link
                      to="javascript:void(0);"
                      className="fs-11 text-success text-end ms-auto"
                      data-bs-toggle="tooltip"
                      title="Make as Read"
                    >
                      <i className="feather-check"></i>
                      <span>Make as Read</span>
                    </Link>
                  </div>
                  <div className="notifications-item">
                    <img
                      src={
                        new URL(
                          "../assets copy/images/avatar/2.png",
                          import.meta.url,
                        ).href
                      }
                      alt=""
                      className="rounded me-3 border"
                    />
                    <div className="notifications-desc">
                      <Link
                        to="javascript:void(0);"
                        className="font-body text-truncate-2-line"
                      >
                        {" "}
                        <span className="fw-semibold text-dark">
                          Malanie Hanvey
                        </span>{" "}
                        We should talk about that at lunch!
                      </Link>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">
                          2 minutes ago
                        </div>
                        <div className="d-flex align-items-center float-end gap-2">
                          <Link
                            to="javascript:void(0);"
                            className="d-block wd-8 ht-8 rounded-circle bg-gray-300"
                            data-bs-toggle="tooltip"
                            title="Make as Read"
                          ></Link>
                          <Link
                            to="javascript:void(0);"
                            className="text-danger"
                            data-bs-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="feather-x fs-12"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notifications-item">
                    <img
                      src={
                        new URL(
                          "../assets copy/images/avatar/3.png",
                          import.meta.url,
                        ).href
                      }
                      alt=""
                      className="rounded me-3 border"
                    />
                    <div className="notifications-desc">
                      <Link
                        to="javascript:void(0);"
                        className="font-body text-truncate-2-line"
                      >
                        {" "}
                        <span className="fw-semibold text-dark">
                          Valentine Maton
                        </span>{" "}
                        You can download the latest invoices now.
                      </Link>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">
                          36 minutes ago
                        </div>
                        <div className="d-flex align-items-center float-end gap-2">
                          <Link
                            to="javascript:void(0);"
                            className="d-block wd-8 ht-8 rounded-circle bg-gray-300"
                            data-bs-toggle="tooltip"
                            title="Make as Read"
                          ></Link>
                          <Link
                            to="javascript:void(0);"
                            className="text-danger"
                            data-bs-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="feather-x fs-12"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notifications-item">
                    <img
                      src={
                        new URL(
                          "../assets copy/images/avatar/4.png",
                          import.meta.url,
                        ).href
                      }
                      alt=""
                      className="rounded me-3 border"
                    />
                    <div className="notifications-desc">
                      <Link
                        to="javascript:void(0);"
                        className="font-body text-truncate-2-line"
                      >
                        {" "}
                        <span className="fw-semibold text-dark">
                          archie Cantones
                        </span>{" "}
                        Don't forget to pickup Jeremy after school!
                      </Link>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">
                          53 minutes ago
                        </div>
                        <div className="d-flex align-items-center float-end gap-2">
                          <Link
                            to="javascript:void(0);"
                            className="d-block wd-8 ht-8 rounded-circle bg-gray-300"
                            data-bs-toggle="tooltip"
                            title="Make as Read"
                          ></Link>
                          <Link
                            to="javascript:void(0);"
                            className="text-danger"
                            data-bs-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="feather-x fs-12"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center notifications-footer">
                    <Link
                      to="javascript:void(0);"
                      className="fs-13 fw-semibold text-dark"
                    >
                      alls Notifications
                    </Link>
                  </div>
                </div>
              </div>
              <div className="dropdown nxl-h-item">
                <Link
                  to="javascript:void(0);"
                  data-bs-toggle="dropdown"
                  role="button"
                  data-bs-auto-close="outside"
                >
                  <img
                    src={
                      new URL(
                        "../assets copy/images/avatar/1.png",
                        import.meta.url,
                      ).href
                    }
                    alt="user-image"
                    className="img-fluid user-avtar me-0"
                  />
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                  <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          new URL(
                            "../assets copy/images/avatar/1.png",
                            import.meta.url,
                          ).href
                        }
                        alt="user-image"
                        className="img-fluid user-avtar"
                      />
                      <div>
                        <h6 className="text-dark mb-0">
                          alexandra Della{" "}
                          <span className="badge bg-soft-success text-success ms-1">
                            PRO
                          </span>
                        </h6>
                        <span className="fs-12 fw-medium text-muted">
                          alex.della@outlook.com
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <Link
                      to="javascript:void(0);"
                      className="dropdown-item"
                      data-bs-toggle="dropdown"
                    >
                      <span className="hstack">
                        <i className="wd-10 ht-10 border border-2 border-gray-1 bg-success rounded-circle me-2"></i>
                        <span>active</span>
                      </span>
                      <i className="feather-chevron-right ms-auto me-0"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-warning rounded-circle me-2"></i>
                          <span>always</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-success rounded-circle me-2"></i>
                          <span>active</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-danger rounded-circle me-2"></i>
                          <span>Bussy</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-info rounded-circle me-2"></i>
                          <span>Inactive</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-dark rounded-circle me-2"></i>
                          <span>Disabled</span>
                        </span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-10 ht-10 border border-2 border-gray-1 bg-primary rounded-circle me-2"></i>
                          <span>Cutomization</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown">
                    <Link
                      to="javascript:void(0);"
                      className="dropdown-item"
                      data-bs-toggle="dropdown"
                    >
                      <span className="hstack">
                        <i className="feather-dollar-sign me-2"></i>
                        <span>Subscriptions</span>
                      </span>
                      <i className="feather-chevron-right ms-auto me-0"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Plan</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Billings</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Referrals</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Payments</span>
                        </span>
                      </Link>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Statements</span>
                        </span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                          <span>Subscriptions</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="javascript:void(0);" className="dropdown-item">
                    <i className="feather-user"></i>
                    <span>Profile Details</span>
                  </Link>
                  <Link to="javascript:void(0);" className="dropdown-item">
                    <i className="feather-activity"></i>
                    <span>activity Feed</span>
                  </Link>
                  <Link to="javascript:void(0);" className="dropdown-item">
                    <i className="feather-dollar-sign"></i>
                    <span>Billing Details</span>
                  </Link>
                  <Link to="javascript:void(0);" className="dropdown-item">
                    <i className="feather-bell"></i>
                    <span>Notifications</span>
                  </Link>
                  <Link to="javascript:void(0);" className="dropdown-item">
                    <i className="feather-settings"></i>
                    <span>account Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/auth-login-minimal"
                    className="dropdown-item"
                  >
                    <i className="feather-log-out"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <!--! [End] Header Right !--> */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
