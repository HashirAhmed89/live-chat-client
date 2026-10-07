import React from 'react';

const taskGroups = [
  {
    title: 'Recently Assigned',
    targetId: '#tasks_collapse_1',
    items: [
      {
        id: 'customCheckTask1',
        title: 'Video conference with Canada Team',
        tag: 'High',
        tagClass: 'bg-soft-danger text-danger',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Calls',
        date: '27 Nov, 2023',
        avatar: '1.png',
        priority: 'danger',
      },
      {
        id: 'customCheckTask2',
        title: 'Client objective meeting',
        tag: 'Normal',
        tagClass: 'bg-soft-primary text-primary',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Conferences',
        date: '22 Nov, 2023',
        avatar: '2.png',
        priority: 'primary',
      },
      {
        id: 'customCheckTask3',
        title: 'Target market trend analysis on the go',
        tag: 'Medium',
        tagClass: 'bg-soft-warning text-warning',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Meetings',
        date: '23 Nov, 2023',
        avatar: '3.png',
        priority: 'warning',
      },
      {
        id: 'customCheckTask4',
        title: 'Send revised proposal to Mr. Dow Jones',
        tag: 'Low',
        tagClass: 'bg-soft-success text-success',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Calls',
        date: '28 Nov, 2023',
        avatar: '4.png',
        priority: 'success',
      },
      {
        id: 'customCheckTask5',
        title: 'Product update briefing',
        tag: 'Normal',
        tagClass: 'bg-soft-primary text-primary',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Meetings',
        date: '25 Nov, 2023',
        avatar: '5.png',
        priority: 'primary',
      },
      {
        id: 'customCheckTask6',
        title: 'Monthly sales pipeline review',
        tag: 'High',
        tagClass: 'bg-soft-danger text-danger',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Calls',
        date: '29 Nov, 2023',
        avatar: '6.png',
        priority: 'danger',
      },
    ],
  },
  {
    title: '20 Nov, 2023',
    targetId: '#tasks_collapse_20_nov',
    items: [
      {
        id: 'customCheckTask7',
        title: 'Target market trend analysis on the go',
        tag: 'Medium',
        tagClass: 'bg-soft-warning text-warning',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Meetings',
        date: '23 Nov, 2023',
        avatar: '3.png',
        priority: 'warning',
      },
      {
        id: 'customCheckTask8',
        title: 'Send revised proposal to Mr. Dow Jones',
        tag: 'Low',
        tagClass: 'bg-soft-success text-success',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Calls',
        date: '28 Nov, 2023',
        avatar: '4.png',
        priority: 'success',
      },
      {
        id: 'customCheckTask9',
        title: 'Video conference with Canada Team',
        tag: 'High',
        tagClass: 'bg-soft-danger text-danger',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Calls',
        date: '27 Nov, 2023',
        avatar: '1.png',
        priority: 'danger',
      },
      {
        id: 'customCheckTask10',
        title: 'Client objective meeting',
        tag: 'Normal',
        tagClass: 'bg-soft-primary text-primary',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Conferences',
        date: '22 Nov, 2023',
        avatar: '2.png',
        priority: 'primary',
      },
      {
        id: 'customCheckTask11',
        title: 'Client objective meeting',
        tag: 'Normal',
        tagClass: 'bg-soft-primary text-primary',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Conferences',
        date: '22 Nov, 2023',
        avatar: '2.png',
        priority: 'primary',
      },
      {
        id: 'customCheckTask12',
        title: 'Video conference with Canada Team',
        tag: 'High',
        tagClass: 'bg-soft-danger text-danger',
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        badge: 'Meeting',
        date: '27 Nov, 2023',
        avatar: '1.png',
        priority: 'danger',
      },
    ],
  },
];

const sidebarLinks = [
  { icon: 'feather-list', label: 'New' },
  { icon: 'feather-watch', label: 'Pending' },
  { icon: 'feather-activity', label: 'Inprogress' },
  { icon: 'feather-check-circle', label: 'Completed' },
  { icon: 'feather-hash', label: 'Task Attachments' },
];

const tagOptions = [
  ['Office', true],
  ['Family', false],
  ['Friend', true],
  ['Marketplace', false],
  ['Development', false],
];

const labelOptions = [
  ['Updates', false],
  ['Socials', false],
  ['Primary', true],
  ['Forums', false],
  ['Promotions', true],
];

const priorityBadgeClass = (priority) => {
  switch (priority) {
    case 'danger':
      return 'bg-soft-danger text-danger';
    case 'warning':
      return 'bg-soft-warning text-warning';
    case 'success':
      return 'bg-soft-success text-success';
    default:
      return 'bg-soft-primary text-primary';
  }
};

const Ticket = () => {
  return (
    <>
      {/* Main task page shell */}
      <main className="nxl-container apps-container apps-tasks">
        <div className="nxl-content without-header nxl-full-content">
          <div className="main-content d-flex">
            {/* Left task sidebar */}
            <aside className="content-sidebar content-sidebar-md" data-scrollbar-target="#psScrollbarInit">
              <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                <h4 className="fw-bolder mb-0">Tasks</h4>
                <a href="javascript:void(0);" className="app-sidebar-close-trigger d-flex">
                  <i className="feather-x"></i>
                </a>
              </div>

              <div className="content-sidebar-header">
                <a href="javascript:void(0);" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addNewTasks">
                  <i className="feather-plus me-2"></i>
                  <span>Add Tasks</span>
                </a>
              </div>

              <div className="content-sidebar-body">
                <ul className="nav flex-column nxl-content-sidebar-item">
                  {sidebarLinks.slice(0, 4).map((item) => (
                    <li className="nav-item" key={item.label}>
                      <a className="nav-link" href="javascript:void(0);">
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <ul className="nav flex-column nxl-content-sidebar-item">
                  <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
                    <span>Priority</span>
                    <a href="javascript:void(0);">
                      <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New">
                        <i className="feather-plus"></i>
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="wd-7 ht-7 bg-dark rounded-circle"></span>
                      <span>Low</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="wd-7 ht-7 bg-warning rounded-circle"></span>
                      <span>Medium</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <span className="wd-7 ht-7 bg-danger rounded-circle"></span>
                      <span>High</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0);">
                      <i className="feather-hash"></i>
                      <span>Tasks Attachments</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            {/* Main list area */}
            <div className="content-area" data-scrollbar-target="#psScrollbarInit">
              <div className="content-area-header sticky-top">
                <div className="page-header-left d-flex align-items-center gap-2">
                  <a href="javascript:void(0);" className="app-sidebar-open-trigger me-2">
                    <i className="feather-align-left fs-20"></i>
                  </a>

                  <div className="dropdown">
                    <a href="javascript:void(0)" className="btn btn-light-brand dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="0,16">
                      <i className="feather-check-circle me-2"></i>
                      <span>My Tasks</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="javascript:void(0)">
                        <i className="feather-hash"></i>
                        <span>All Tasks</span>
                      </a>
                      <a className="dropdown-item active" href="javascript:void(0)">
                        <i className="feather-check-circle"></i>
                        <span>My Tasks</span>
                      </a>
                      <a className="dropdown-item" href="javascript:void(0)">
                        <i className="feather-airplay"></i>
                        <span>Overviews</span>
                      </a>
                      <a className="dropdown-item" href="javascript:void(0)">
                        <i className="feather-clock"></i>
                        <span>Pending Tasks</span>
                      </a>
                      <a className="dropdown-item" href="javascript:void(0)">
                        <i className="feather-activity"></i>
                        <span>InProgress Tasks</span>
                      </a>
                    </div>
                  </div>

                  <div className="dropdown">
                    <a href="javascript:void(0)" className="avatar-text avatar-md" data-bs-toggle="dropdown" data-bs-offset="0,22">
                      <i className="feather-eye"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-eye me-3"></i>
                          <span>Read</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-eye-off me-3"></i>
                          <span>Unread</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-star me-3"></i>
                          <span>Starred</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-shield-off me-3"></i>
                          <span>Unstarred</span>
                        </a>
                      </li>
                      <li className="dropdown-divider"></li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-clock me-3"></i>
                          <span>Snooze</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-check-circle me-3"></i>
                          <span>Add Tasks</span>
                        </a>
                      </li>
                      <li className="dropdown-divider"></li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-archive me-3"></i>
                          <span>Archive</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-alert-octagon me-3"></i>
                          <span>Report Spam</span>
                        </a>
                      </li>
                      <li className="dropdown-divider"></li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0)">
                          <i className="feather-trash-2 me-3"></i>
                          <span>Delete</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="dropdown">
                    <a href="javascript:void(0)" className="d-flex" data-bs-toggle="dropdown" data-bs-offset="0,22" data-bs-auto-close="outside" aria-expanded="false">
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Tags">
                        <i className="feather-tag"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu">
                      {tagOptions.map(([label, checked]) => (
                        <div key={label} className="dropdown-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={label}
                              defaultChecked={checked}
                            />
                            <label className="custom-control-label c-pointer" htmlFor={label}>
                              {label}
                            </label>
                          </div>
                        </div>
                      ))}
                      <div className="dropdown-divider"></div>
                      <a href="javascript:void(0);" className="dropdown-item">
                        <i className="feather-plus me-3"></i>
                        <span>Create Tag</span>
                      </a>
                      <a href="javascript:void(0);" className="dropdown-item">
                        <i className="feather-tag me-3"></i>
                        <span>Manages Tag</span>
                      </a>
                    </div>
                  </div>

                  <div className="dropdown">
                    <a href="javascript:void(0)" className="d-flex" data-bs-toggle="dropdown" data-bs-offset="0,22" data-bs-auto-close="outside" aria-expanded="false">
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Labels">
                        <i className="feather-folder-plus"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu">
                      {labelOptions.map(([label, checked]) => (
                        <div key={label} className="dropdown-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={label}
                              defaultChecked={checked}
                            />
                            <label className="custom-control-label c-pointer" htmlFor={label}>
                              {label}
                            </label>
                          </div>
                        </div>
                      ))}
                      <div className="dropdown-divider"></div>
                      <a href="javascript:void(0);" className="dropdown-item">
                        <i className="feather-plus me-3"></i>
                        <span>Create Label</span>
                      </a>
                      <a href="javascript:void(0);" className="dropdown-item">
                        <i className="feather-folder-plus me-3"></i>
                        <span>Manages Label</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="page-header-right ms-auto">
                  <div className="hstack gap-2">
                    <div className="hstack">
                      <a href="javascript:void(0)" className="search-form-open-toggle">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Search">
                          <i className="feather-search"></i>
                        </div>
                      </a>
                      <form className="search-form" style={{ display: 'none' }}>
                        <div className="search-form-inner">
                          <a href="javascript:void(0)" className="search-form-close-toggle">
                            <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Search Close">
                              <i className="feather-arrow-left"></i>
                            </div>
                          </a>
                          <input
                            type="search"
                            className="py-3 px-0 border-0 w-100"
                            id="tasksSearch"
                            placeholder="Search..."
                          />
                        </div>
                      </form>
                    </div>

                    <a href="javascript:void(0)" className="d-none d-sm-flex">
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Newest">
                        <i className="feather-chevron-left"></i>
                      </div>
                    </a>

                    <div className="dropdown d-none d-sm-flex">
                      <a href="javascript:void(0)" className="d-flex" data-bs-toggle="dropdown" data-bs-offset="0,22">
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sort Status">
                          <i className="feather-filter"></i>
                        </div>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="javascript:void(0)">Newest</a></li>
                        <li><a className="dropdown-item" href="javascript:void(0)">Oldest</a></li>
                        <li><a className="dropdown-item" href="javascript:void(0)">Ascending</a></li>
                        <li><a className="dropdown-item" href="javascript:void(0)">Descending</a></li>
                      </ul>
                    </div>

                    <div className="dropdown d-none d-sm-flex">
                      <a
                        href="javascript:void(0)"
                        className="d-flex"
                        data-bs-toggle="dropdown"
                        data-bs-offset="0,22"
                        data-bs-auto-close="outside"
                      >
                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-plus me-3"></i>
                          <span>Add to Group</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-user-plus me-3"></i>
                          <span>Add to Contact</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-eye-off me-3"></i>
                          <span>Make as Unread</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-sliders me-3"></i>
                          <span>Filter Messages</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-archive me-3"></i>
                          <span>Make as Archive</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-slash me-3"></i>
                          <span>Report Spam</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-sliders me-3"></i>
                          <span>Report phishing</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-download me-3"></i>
                          <span>Download Messages</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell-off me-3"></i>
                          <span>Mute Conversion</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-slash me-3"></i>
                          <span>Block Conversion</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2 me-3"></i>
                          <span>Delete Conversion</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task groups list */}
              <div className="content-area-body">
                {taskGroups.map((group, groupIndex) => (
                  <div key={group.title} className={groupIndex === 0 ? 'card stretch stretch-full' : 'card mb-0'}>
                    <a
                      href="javascript:void(0);"
                      className="card-header"
                      data-bs-toggle="collapse"
                      data-bs-target={group.targetId}
                    >
                      <h5 className="mb-0">{group.title}</h5>
                    </a>
                    <div className="card-body collapse show" id={group.targetId.replace('#', '')}>
                      <ul className="list-unstyled mb-0">
                        {group.items.map((task, index) => (
                          <li
                            key={task.id}
                            className={`single-task-list p-3 ${index === group.items.length - 1 ? 'mb-0' : 'mb-3'} border border-dashed rounded-3`}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-3 me-3">
                                <div className="custom-control custom-checkbox me-2">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={task.id}
                                    data-checked-action="task-action"
                                  />
                                  <label className="custom-control-label c-pointer" htmlFor={task.id}></label>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="lh-base"><i className="feather-star"></i></div>
                                  <a
                                    href="javascript:void(0);"
                                    className="single-task-list-link"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#tasksDetailsOffcanvas"
                                  >
                                    <div className="fs-13 fw-bold text-truncate-1-line">
                                      {task.title} <span className={`ms-2 badge ${task.tagClass}`}>{task.tag}</span>
                                    </div>
                                    <div className="fs-12 fw-normal text-muted text-truncate-1-line">
                                      {task.note}
                                    </div>
                                  </a>
                                </div>
                              </div>

                              <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                <div className={`badge ${priorityBadgeClass(task.priority)} d-md-inline-block d-none`}>
                                  {task.badge}
                                </div>
                                <div className="d-md-inline-block d-none me-3">{task.date}</div>
                                <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                  <img src={`assets/images/avatar/${task.avatar}`} alt="user" className="img-fluid" />
                                </div>
                                <div className="dropdown">
                                  <a href="javascript:void(0);" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                    <i className="feather-more-vertical"></i>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                    <a className="dropdown-item view-task" href="#">View Task</a>
                                    <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Ticket;
