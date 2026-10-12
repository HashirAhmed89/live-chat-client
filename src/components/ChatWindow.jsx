import avatar1 from "../assets copy/images/avatar/1.png";
import avatar2 from "../assets copy/images/avatar/2.png";
import zipFileIcon from "../assets copy/images/file-icons/zip.png";
import pngFileIcon from "../assets copy/images/file-icons/png.png";
import psdFileIcon from "../assets copy/images/file-icons/psd.png";
import { Link, useParams } from "react-router-dom";

const ChatWindow = () => {
  const { id } = useParams();
  const conversation = null;
  void id;

  return (
      <div>
        <main className="nxl-container apps-container apps-chat">
          <div className="nxl-content without-header nxl-full-content">
            {/* [ Main Content ] start */}
            <div className="main-content d-flex">
              <div
                className="content-area"
                data-scrollbar-target="#psScrollbarInit"
              >
                <div className="content-area-header sticky-top">
                  <div className="page-header-left hstack gap-4">
                    <a
                      href="javascript:void(0);"
                      className="app-sidebar-open-trigger"
                    >
                      <i className="feather-align-left fs-20"></i>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="d-flex align-items-center justify-content-center gap-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#userProfileDetails"
                    >
                      <div className="avatar-image">
                        <img src={avatar1} className="img-fluid" alt="image" />
                      </div>
                      <div className="d-none d-sm-block">
                        <div className="fw-bold d-flex align-items-center">
                          {/* <h4>{conversation?.name}</h4> */}
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          <span className="wd-7 ht-7 rounded-circle opacity-75 me-2 bg-success"></span>
                          <span className="fs-9 text-uppercase fw-bold text-success">
                            <span></span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/* <div className="page-header-right ms-auto">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <a
                        href="javascript:void(0)"
                        className="d-flex"
                        data-bs-toggle="modal"
                        data-bs-target="#voiceCallingModalScreen"
                      >
                        <div
                          className="avatar-text avatar-md"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Voice Call"
                        >
                          <i className="feather-phone-call"></i>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex d-flex"
                        data-bs-toggle="modal"
                        data-bs-target="#videoCallingModalScreen"
                      >
                        <div
                          className="avatar-text avatar-md"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Video Call"
                        >
                          <i className="feather-video"></i>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex d-none d-sm-block successAlertMessage"
                      >
                        <div
                          className="avatar-text avatar-md"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Add to Favorite"
                        >
                          <i className="feather-star"></i>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="ac-info-sidebar-open-trigger"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#userProfileDetails"
                      >
                        <div
                          className="avatar-text avatar-md"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Profile Info"
                        >
                          <i className="feather-info"></i>
                        </div>
                      </a>
                      <div className="dropdown">
                        <a
                          href="javascript:void(0);"
                          className="avatar-text avatar-md"
                          data-bs-toggle="dropdown"
                          data-bs-offset="0,22"
                        >
                          <i className="feather-more-vertical"></i>
                        </a>
                        <div className="dropdown-menu">
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-plus me-3"></i>
                            <span> Join Group</span>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-user-plus me-3"></i>
                            <span>Invite People</span>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-star me-3"></i>
                            <span>Add to Favorite</span>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-bell-off me-3"></i>
                            <span>Mute Conversion</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-phone-call me-3"></i>
                            <span>Group Audio Call</span>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-video me-3"></i>
                            <span>Group Video Call</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-slash me-3"></i>
                            <span>Block Conversion</span>
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            <i className="feather-trash-2 me-3"></i>
                            <span>Delete Conversion</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="content-area-body">
                  {/* ! BEGIN: Single Message [start] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar1}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="javascript:void(0);">{conversation?.name} </Link>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">{conversation?.updatedAt}</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <p className="py-2 px-3 rounded-5 bg-white">{conversation?.message}</p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                       
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message  [start] ! */}
                  {/* ! BEGIN: Single Message [Reply] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar2}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex flex-row-reverse align-items-center gap-2">
                        <a href="javascript:void(0);">Green Cute</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:35 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        Hello Alex!!! Welcome to Live Chat!!!
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        My name is Green & How can I help you today???
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message [Reply] ! */}
                  {/* ! BEGIN: Single Message [start] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar1}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex align-items-center gap-2">
                        <a href="javascript:void(0);">Alexandra Della</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:40 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        Hi, I wanted to check my order status....
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        My order number is{" "}
                        <a href="javascript:void(0);">#NXL0458</a>
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message  [start] ! */}
                  {/* ! BEGIN: Single Message [Reply] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar2}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex flex-row-reverse align-items-center gap-2">
                        <a href="javascript:void(0);">Green Cute</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:42 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        No problem, let me check that for you.
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white">
                        Thanks for the information!!! Give me one moment please
                        while I check on that for you.
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        Thanks for your times, Your order{" "}
                        <a href="javascript:void(0);">#NXL0458</a> will arive on
                        this weekend.
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message [Reply] ! */}
                  {/* ! BEGIN: Single Message [start] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar1}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex align-items-center gap-2">
                        <a href="javascript:void(0);">Alexandra Della</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:45 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        Thanks. I'm worried😳 it won't arrive in time⌚ for my
                        daughter's birthday🎂 party🎉 this weekend.
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        Order tracking number is:{" "}
                        <a href="javascript:void(0);">#698745</a>
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message  [start] ! */}
                  {/* ! BEGIN: Single Message [Reply] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar2}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex flex-row-reverse align-items-center gap-2">
                        <a href="javascript:void(0);">Green Cute</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:48 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        I understand your concern… I wouldn't want my child's
                        gift to arrive late either.
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white">
                        It looks like your order is set to arrive in 2 business
                        days, so it should arrive by Friday, just in time!
                      </p>
                      <div className="mb-3 d-flex align-items-center justify-content-between bg-white border rounded-3">
                        <div className="d-flex align-items-center">
                          <a
                            href="javascript:void(0)"
                            className="p-3 d-flex align-items-center border-end wd-70 ht-70"
                          >
                            <img
                              src={zipFileIcon}
                              className="img-fluid"
                              alt="image"
                            />
                          </a>
                          <div className="d-block ms-3">
                            <a
                              href="javascript:void(0)"
                              className="fs-13 fw-700 text-dark d-block"
                            >
                              Order.zip
                            </a>
                            <small className="fw-300 text-dark">
                              402.65/KB
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center p-3 border-start">
                          <a
                            href="javascript:void(0)"
                            className="avatar-text file-download"
                          >
                            <i className="feather-download"></i>
                          </a>
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center justify-content-between bg-white border rounded-3">
                        <div className="d-flex align-items-center">
                          <a
                            href="javascript:void(0)"
                            className="p-3 d-flex align-items-center border-end wd-70 ht-70"
                          >
                            <img
                              src={pngFileIcon}
                              className="img-fluid"
                              alt="image"
                            />
                          </a>
                          <div className="d-block ms-3">
                            <a
                              href="javascript:void(0)"
                              className="fs-13 fw-700 text-dark d-block"
                            >
                              Document.png
                            </a>
                            <small className="fw-300 text-dark">
                              480.14/KB
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center p-3 border-start">
                          <a
                            href="javascript:void(0)"
                            className="avatar-text file-download"
                          >
                            <i className="feather-download"></i>
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between bg-white border rounded-3">
                        <div className="d-flex align-items-center">
                          <a
                            href="javascript:void(0)"
                            className="p-3 d-flex align-items-center border-end wd-70 ht-70"
                          >
                            <img
                              src={psdFileIcon}
                              className="img-fluid"
                              alt="image"
                            />
                          </a>
                          <div className="d-block ms-3">
                            <a
                              href="javascript:void(0)"
                              className="fs-13 fw-700 text-dark d-block"
                            >
                              Photos.psd
                            </a>
                            <small className="fw-300 text-dark">
                              248.54/KB
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center p-3 border-start">
                          <a
                            href="javascript:void(0)"
                            className="avatar-text file-download"
                          >
                            <i className="feather-download"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ! END: Single Message [Reply] ! */}
                  {/* ! BEGIN: Single Message [start] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar1}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex align-items-center gap-2">
                        <a href="javascript:void(0);">Alexandra Della</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:50 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        The birthday🎂 ceremony preparation almost completed
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        Thank your so much.....!!!!
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message  [start] ! */}
                  {/* ! BEGIN: Single Message [Reply] ! */}
                  <div className="single-chat-item mb-5">
                    <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar2}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex flex-row-reverse align-items-center gap-2">
                        <a href="javascript:void(0);">Green Cute</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">10:53 PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                      <p className="py-2 px-3 rounded-5 bg-white">
                        I understand your concern......!!
                      </p>
                      <p className="py-2 px-3 rounded-5 bg-white mb-0">
                        Anything else can I help you???
                      </p>
                    </div>
                  </div>
                  {/* ! END: Single Message [Reply] ! */}
                  {/* ! BEGIN: Single Message [start] ! */}
                  <div className="single-chat-item mb-0">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <a href="javascript:void(0)" className="avatar-image">
                        <img
                          src={avatar1}
                          className="img-fluid rounded-circle"
                          alt="image"
                        />
                      </a>
                      <div className="d-flex align-items-center gap-2">
                        <a href="javascript:void(0);">Alexandra Della</a>
                        <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                        <span className="fs-11 text-muted">00:00 AM/PM</span>
                      </div>
                    </div>
                    <div className="wd-500 p-3 rounded-5 bg-gray-200">
                      <div className="py-2 px-3 rounded-5 bg-white d-flex align-items-center text typing chat-message-items">
                        <div className="fs-12 fw-semibold text-success">
                          Typing
                        </div>
                        <div className="wave">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ! END: Single Message  [start] ! */}
                </div>
                {/* ! BEGIN: Message Editor ! */}
                <div className="d-flex align-items-center justify-content-between border-top border-gray-5 bg-white sticky-bottom">
                  <div className="d-flex align-center">
                    <div className="dropdown border-end border-gray-5">
                      <a href="javascript:void(0)" data-bs-toggle="dropdown">
                        <div
                          className="wd-60 d-flex align-items-center justify-content-center"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Pick Template"
                          style={{ height: "59px" }}
                        >
                          <i className="feather-hash"></i>
                        </div>
                      </a>
                      <ul className="dropdown-menu wd-300">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Welcome
                            you message
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Your
                            issues solved
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Thank you
                            message
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Make a
                            offer message
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Add the
                            Unsubscribe option
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file-text me-3"></i>Thank your
                            customer for joining
                          </a>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-save me-3"></i>Save as
                            Template
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-sun me-3"></i>Manage Template
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown border-end border-gray-5">
                      <a href="javascript:void(0)" data-bs-toggle="dropdown">
                        <div
                          className="wd-60 d-flex align-items-center justify-content-center"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Upload Attachments"
                          style={{ height: "59px" }}
                        >
                          <i className="feather-link"></i>
                        </div>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-image me-3"></i>Upload Images
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-mic me-3"></i>Upload Audios
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-video me-3"></i>Upload Videos
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                          >
                            <i className="feather-file me-3"></i>Upload
                            Documents
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown border-end border-gray-5 d-none d-sm-block">
                      <a href="javascript:void(0)" data-bs-toggle="dropdown">
                        <div
                          className="wd-60 d-flex align-items-center justify-content-center"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          title="Calling Options"
                          style={{ height: "59px" }}
                        >
                          <i className="feather-phone-call"></i>
                        </div>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#voiceCallingModalScreen"
                          >
                            <i className="feather-phone-call me-3"></i>Audio
                            Call
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#videoCallingModalScreen"
                          >
                            <i className="feather-video me-3"></i>Video Call
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <input
                    className="form-control border-0 emoji-picker"
                    placeholder="Type your message here..."
                  />
                  <div className="border-start border-gray-5 send-message">
                    <a
                      href="javascript:void(0)"
                      className="wd-60 d-flex align-items-center justify-content-center"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      title="Send Message"
                      style={{ height: "59px" }}
                    >
                      <i className="feather-send"></i>
                    </a>
                  </div>
                </div>
                {/* ! END: Message Editor ! */}
              </div>
              </div>
            {/* [ Main Content ] end */}
          </div>
        </main>
      </div>
  );
};

export default ChatWindow;
