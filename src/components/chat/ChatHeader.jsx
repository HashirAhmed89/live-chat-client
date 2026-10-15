import avatar1 from "../../assets copy/images/avatar/1.png";

// Show the selected conversation in the chat header.
const ChatHeader = ({ name }) => (
  <div className="content-area-header sticky-top">
    <div className="page-header-left hstack gap-4">
      <a href="javascript:void(0);" className="app-sidebar-open-trigger">
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
            <h4>{name}</h4>
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
  </div>
);

export default ChatHeader;
