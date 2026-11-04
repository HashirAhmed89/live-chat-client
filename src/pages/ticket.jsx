import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/authcontext';
import {
  assignTicket as saveTicketAssignment,
  deleteTicket as removeTicket,
  fetchAgents,
  fetchTicketById,
  fetchTickets,
  updateTicketPriority as saveTicketPriority,
  updateTicketStatus as saveTicketStatus,
} from '../components/chat/chatwindowservice';

const ticketStatuses = ['open', 'pending', 'resolved', 'closed'];
const ticketPriorities = ['low', 'medium', 'high', 'urgent'];
const unauthorizedTicketUpdateMessage =
  'You are not authorized to update this ticket. Only the assigned agent or an admin can update it.';

const getTicketArray = (data) => {
  const candidates = [
    data,
    data?.tickets,
    data?.data,
    data?.data?.tickets,
    data?.data?.data,
    data?.data?.data?.tickets,
  ];
  const tickets = candidates.find(Array.isArray);

  if (!tickets) {
    throw new Error('The server did not return a ticket list.');
  }

  return tickets;
};

const normalizeId = (value) => {
  if (value == null) return '';
  if (typeof value === 'object') {
    return String(value._id ?? value.id ?? value.userId ?? '');
  }
  return String(value);
};

const getTicketAssigneeId = (ticket) => {
  const assignees = [
    ticket?.assignedAgentId,
    ticket?.assignedTo,
    ticket?.assignedAgent,
    ticket?.assignee,
    ticket?.agentId,
    ticket?.agent,
    ticket?.assignedToId,
  ];
  const assignee = assignees.find((value) =>
    normalizeId(value?.user ?? value?.agent ?? value),
  );

  return normalizeId(assignee?.user ?? assignee?.agent ?? assignee);
};

const getTicketValue = (value, fallback) =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

const getTicketDetailsObject = (data) => {
  const detailFields = [
    'subject',
    'title',
    'description',
    'status',
    'priority',
    'customer',
    'customerId',
    'customerInfo',
    'customerDetails',
    'assignedAgent',
    'assignedAgentId',
    'assignedTo',
    'assignedToId',
    'agent',
    'agentId',
  ];
  const candidates = [
    data?.ticket,
    data?.data?.ticket,
    data?.data?.data?.ticket,
    data?.data?.data,
    data?.data,
    data,
  ];
  const ticket = candidates.find(
    (candidate) =>
      candidate &&
      typeof candidate === 'object' &&
      !Array.isArray(candidate) &&
      detailFields.some((key) => key in candidate),
  );

  if (!ticket) {
    throw new Error('The server did not return valid ticket details.');
  }

  return ticket;
};

const getDisplayValue = (value, ...fallbacks) => {
  const candidate = [value, ...fallbacks].find(
    (item) => item !== null && item !== undefined && String(item).trim(),
  );

  if (candidate == null) return 'Not provided';
  if (typeof candidate === 'object') {
    return (
      candidate.name ??
      candidate.fullName ??
      candidate.displayName ??
      candidate.email ??
      candidate._id ??
      candidate.id ??
      'Not provided'
    );
  }

  return String(candidate);
};

const getPersonName = (person, ...fallbacks) => {
  if (person && typeof person === 'object') {
    return getDisplayValue(
      person.name,
      person.fullName,
      person.displayName,
      person.email,
      person._id,
      person.id,
      ...fallbacks,
    );
  }

  return getDisplayValue(person, ...fallbacks);
};

const getTicketDate = (ticket) => {
  const value = ticket?.createdAt ?? ticket?.updatedAt ?? ticket?.date;
  if (!value) return '';

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
};

const getPriorityClass = (priority) => {
  const value = String(priority || '').toLowerCase();
  if (value.includes('high') || value.includes('urgent') || value.includes('danger')) {
    return 'bg-soft-danger text-danger';
  }
  if (value.includes('medium') || value.includes('warning')) {
    return 'bg-soft-warning text-warning';
  }
  if (value.includes('low') || value.includes('success')) {
    return 'bg-soft-success text-success';
  }
  return 'bg-soft-primary text-primary';
};

const sidebarLinks = [
  { icon: 'feather-list', label: 'New' },
  { icon: 'feather-watch', label: 'Pending' },
  { icon: 'feather-activity', label: 'Inprogress' },
  { icon: 'feather-check-circle', label: 'Completed' },
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

const Ticket = () => {
  const { user, token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [priorityUpdating, setPriorityUpdating] = useState(false);
  const [priorityMessage, setPriorityMessage] = useState(null);
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [agentsError, setAgentsError] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [assignmentUpdating, setAssignmentUpdating] = useState(false);
  const [assignmentMessage, setAssignmentMessage] = useState(null);
  const assignmentInProgress = useRef(false);
  const [deletingTicketId, setDeletingTicketId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(null);
  const role = String(user?.role || user?.userRole || user?.type || '')
    .trim()
    .toLowerCase();
  const agentId = normalizeId(user?._id ?? user?.id ?? user?.userId);
  const canUpdateTicket =
    role === 'admin' ||
    (role === 'agent' &&
      Boolean(agentId) &&
      normalizeId(getTicketAssigneeId(ticketDetails)) === agentId);

  // Confirm and delete a ticket, then remove it from the visible list.
  const handleDeleteTicket = async (ticketId, title) => {
    if (role !== 'admin') {
      setDeleteMessage({
        type: 'error',
        text: 'Only admins can delete tickets.',
      });
      return;
    }

    if (!token || !ticketId || deletingTicketId) return;

    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingTicketId(ticketId);
    setDeleteMessage(null);

    try {
      const response = await removeTicket({ ticketId, token });
      setTickets((currentTickets) =>
        currentTickets.filter(
          (ticket) =>
            normalizeId(ticket?._id ?? ticket?.id ?? ticket?.ticketId) !==
            ticketId,
        ),
      );
      setDeleteMessage({
        type: 'success',
        text: response?.message || 'Ticket deleted successfully.',
      });
    } catch (deleteError) {
      console.error('Failed to delete ticket.', deleteError);
      setDeleteMessage({
        type: 'error',
        text: deleteError.message || 'Failed to delete ticket.',
      });
    } finally {
      setDeletingTicketId('');
    }
  };

  // Load assignment options only for admins.
  useEffect(() => {
    const controller = new AbortController();

    const loadAgents = async () => {
      if (role !== 'admin' || !token) {
        setAgents([]);
        setAgentsError('');
        setAgentsLoading(false);
        return;
      }

      setAgentsLoading(true);
      setAgentsError('');
      setAgents([]);

      try {
        setAgents(await fetchAgents({ token, signal: controller.signal }));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          console.error('Failed to load agents.', loadError);
          setAgentsError(loadError.message || 'Failed to load agents.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setAgentsLoading(false);
        }
      }
    };

    loadAgents();
    return () => controller.abort();
  }, [role, token]);

  // Assign the selected agent, update local ticket state, and refresh its details.
  const handleTicketAssignment = async () => {
    if (role !== 'admin') {
      setAssignmentMessage({
        type: 'error',
        text: 'Only admins can assign tickets.',
      });
      return;
    }

    if (!token || !selectedTicketId || !selectedAgentId) {
      setAssignmentMessage({
        type: 'error',
        text: 'Select an agent before assigning this ticket.',
      });
      return;
    }

    if (assignmentInProgress.current) return;
    assignmentInProgress.current = true;
    setAssignmentUpdating(true);
    setAssignmentMessage(null);

    try {
      const response = await saveTicketAssignment({
        ticketId: selectedTicketId,
        agentId: selectedAgentId,
        token,
      });
      const assignedAgent = agents.find(
        (agent) => normalizeId(agent._id) === selectedAgentId,
      );
      setAssignmentMessage({
        type: 'success',
        text: `Ticket assigned successfully to ${assignedAgent?.name || 'the selected agent'}.`,
      });

      const assignedTicket = response.data;
      setTicketDetails((currentTicket) => ({
        ...currentTicket,
        ...assignedTicket,
      }));
      setSelectedAgentId(
        getTicketAssigneeId(assignedTicket) || selectedAgentId,
      );
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          normalizeId(ticket?._id ?? ticket?.id ?? ticket?.ticketId) ===
          selectedTicketId
            ? { ...ticket, ...assignedTicket }
            : ticket,
        ),
      );

      try {
        const refreshedData = await fetchTicketById({
          ticketId: selectedTicketId,
          token,
        });
        const refreshedTicket = getTicketDetailsObject(refreshedData);
        setTicketDetails(refreshedTicket);
        setSelectedAgentId(getTicketAssigneeId(refreshedTicket) || selectedAgentId);
        setTickets((currentTickets) =>
          currentTickets.map((ticket) =>
            normalizeId(ticket?._id ?? ticket?.id ?? ticket?.ticketId) ===
            selectedTicketId
              ? { ...ticket, ...refreshedTicket }
              : ticket,
          ),
        );
      } catch (refreshError) {
        console.error('Ticket was assigned, but refreshing its details failed.', refreshError);
      }
    } catch (assignError) {
      console.error('Failed to assign ticket.', assignError);
      setAssignmentMessage({
        type: 'error',
        text: assignError.message || 'Failed to assign ticket.',
      });
    } finally {
      assignmentInProgress.current = false;
      setAssignmentUpdating(false);
    }
  };

  const handleTicketStatusChange = async (event) => {
    const status = event.target.value;

    if (!ticketStatuses.includes(status)) {
      setStatusMessage({ type: 'error', text: 'Invalid ticket status.' });
      return;
    }

    if (!token || !selectedTicketId) {
      setStatusMessage({ type: 'error', text: 'A valid ticket ID and login are required.' });
      return;
    }

    if (!canUpdateTicket) {
      setStatusMessage({
        type: 'error',
        text: unauthorizedTicketUpdateMessage,
      });
      return;
    }

    setStatusUpdating(true);
    setStatusMessage(null);

    try {
      const response = await saveTicketStatus({
        ticketId: selectedTicketId,
        status,
        token,
      });
      const updatedTicket = response.data;
      const mergedTicket = { ...ticketDetails, ...updatedTicket };
      setTicketDetails(mergedTicket);
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          normalizeId(ticket?._id ?? ticket?.id ?? ticket?.ticketId) ===
          selectedTicketId
            ? { ...ticket, ...updatedTicket }
            : ticket,
        ),
      );
      setStatusMessage({
        type: 'success',
        text: response.message || 'Ticket status updated successfully.',
      });
    } catch (updateError) {
      console.error('Failed to update ticket status.', updateError);
      setStatusMessage({
        type: 'error',
        text: updateError.message || 'Failed to update ticket status.',
      });
    } finally {
      setStatusUpdating(false);
    }
  };

  // Persist the selected priority and keep both ticket views in sync.
  const handleTicketPriorityChange = async (event) => {
    const priority = event.target.value;

    if (!ticketPriorities.includes(priority)) {
      setPriorityMessage({ type: 'error', text: 'Invalid ticket priority.' });
      return;
    }

    if (!token || !selectedTicketId) {
      setPriorityMessage({
        type: 'error',
        text: 'A valid ticket ID and login are required.',
      });
      return;
    }

    if (!canUpdateTicket) {
      setPriorityMessage({
        type: 'error',
        text: unauthorizedTicketUpdateMessage,
      });
      return;
    }

    setPriorityUpdating(true);
    setPriorityMessage(null);

    try {
      const response = await saveTicketPriority({
        ticketId: selectedTicketId,
        priority,
        token,
      });
      const updatedTicket = response.data;
      setTicketDetails((currentTicket) => ({
        ...currentTicket,
        ...updatedTicket,
      }));
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          normalizeId(ticket?._id ?? ticket?.id ?? ticket?.ticketId) ===
          selectedTicketId
            ? { ...ticket, ...updatedTicket }
            : ticket,
        ),
      );
      setPriorityMessage({
        type: 'success',
        text: response.message || 'Ticket priority updated successfully.',
      });
    } catch (updateError) {
      console.error('Failed to update ticket priority.', updateError);
      setPriorityMessage({
        type: 'error',
        text: updateError.message || 'Failed to update ticket priority.',
      });
    } finally {
      setPriorityUpdating(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadTickets = async () => {
      setLoading(true);
      setError('');

      if (!token) {
        setTickets([]);
        setError('Please login first.');
        setLoading(false);
        return;
      }

      if (role !== 'admin' && role !== 'agent') {
        setTickets([]);
        setError('Your account does not have permission to view tickets.');
        setLoading(false);
        return;
      }

      if (role === 'agent' && !agentId) {
        setTickets([]);
        setError('Unable to identify the logged-in agent.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchTickets({
          token,
          signal: controller.signal,
        });
        const loadedTickets = getTicketArray(data);
        setTickets(
          role === 'admin'
            ? loadedTickets
            : loadedTickets.filter(
                (ticket) => getTicketAssigneeId(ticket) === agentId,
              ),
        );
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          console.error('Failed to load tickets.', loadError);
          setError(loadError.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadTickets();
    return () => controller.abort();
  }, [agentId, role, token]);

  useEffect(() => {
    if (!selectedTicketId) return undefined;

    const controller = new AbortController();
    const loadTicketDetails = async () => {
      setTicketDetails(null);
      setDetailsError('');
      setDetailsLoading(false);
      setStatusMessage(null);
      setPriorityMessage(null);
      setAssignmentMessage(null);
      setSelectedAgentId('');

      if (role !== 'admin' && role !== 'agent') {
        setDetailsError('Your account does not have permission to view tickets.');
        return;
      }

      if (!token) {
        setDetailsError('Please login first.');
        return;
      }

      setDetailsLoading(true);
      try {
        const data = await fetchTicketById({
          ticketId: selectedTicketId,
          token,
          signal: controller.signal,
        });
        const ticket = getTicketDetailsObject(data);
        if (
          role === 'agent' &&
          getTicketAssigneeId(ticket) !== agentId
        ) {
          setDetailsError(unauthorizedTicketUpdateMessage);
          return;
        }
        setTicketDetails(ticket);
        setSelectedAgentId(getTicketAssigneeId(ticket));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          console.error('Failed to load ticket details.', loadError);
          setDetailsError(loadError.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setDetailsLoading(false);
        }
      }
    };

    loadTicketDetails();
    return () => controller.abort();
  }, [agentId, role, selectedTicketId, token]);

  return (
    <>
      {/* Main task page shell */}
      <main className="nxl-container apps-container apps-tasks">
        <div className="nxl-content without-header nxl-full-content">
          <div className="main-content d-flex">
            {/* Left task sidebar */}
            <aside className="content-sidebar content-sidebar-md" data-scrollbar-target="#psScrollbarInit">
              <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                <h4 className="fw-bolder mb-0">Tickets</h4>
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
                      <span>{role === 'admin' ? 'All Tickets' : 'My Tickets'}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a
                        className={role === 'admin' ? 'dropdown-item active' : 'dropdown-item'}
                        href="javascript:void(0)"
                      >
                        <i className="feather-hash"></i>
                        <span>All Tickets</span>
                      </a>
                      <a
                        className={role === 'admin' ? 'dropdown-item' : 'dropdown-item active'}
                        href="javascript:void(0)"
                      >
                        <i className="feather-check-circle"></i>
                        <span>My Tickets</span>
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

              {/* Tickets list */}
              <div className="content-area-body">
                {deleteMessage && (
                  <div
                    className={`alert ${deleteMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                    role={deleteMessage.type === 'error' ? 'alert' : 'status'}
                  >
                    {deleteMessage.text}
                  </div>
                )}
                {showTicketDetails ? (
                  <div className="card stretch stretch-full">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Ticket Details</h5>
                      <button
                        type="button"
                        className="btn btn-light-brand"
                        onClick={() => {
                          setShowTicketDetails(false);
                          setSelectedTicketId('');
                        }}
                      >
                        <i className="feather-arrow-left me-2"></i>
                        Back to tickets
                      </button>
                    </div>
                    <div className="card-body">
                      {detailsLoading ? (
                        <div role="status">Loading ticket details...</div>
                      ) : detailsError ? (
                        <div className="alert alert-danger mb-0" role="alert">
                          {detailsError}
                        </div>
                      ) : ticketDetails ? (
                        <div className="d-flex flex-column gap-3">
                          <div>
                            <div className="fs-12 text-muted">Subject</div>
                            <div className="fw-bold">
                              {getDisplayValue(
                                ticketDetails.subject,
                                ticketDetails.title,
                                ticketDetails.name,
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="fs-12 text-muted">Description</div>
                            <div>
                              {getDisplayValue(
                                ticketDetails.description,
                                ticketDetails.message,
                                ticketDetails.summary,
                              )}
                            </div>
                          </div>
                          <div className="d-flex flex-wrap gap-4">
                            <div>
                              <div className="fs-12 text-muted">Status</div>
                              <span className={`badge ${getPriorityClass(ticketDetails.status)}`}>
                                {getDisplayValue(ticketDetails.status)}
                              </span>
                              {canUpdateTicket ? (
                                <div className="mt-2">
                                  <label
                                    className="form-label fs-12 mb-1"
                                    htmlFor="ticket-status"
                                  >
                                    Update status
                                  </label>
                                  <select
                                    id="ticket-status"
                                    className="form-select"
                                    value={
                                      ticketStatuses.includes(
                                        String(ticketDetails.status || '').toLowerCase(),
                                      )
                                        ? String(ticketDetails.status).toLowerCase()
                                        : ''
                                    }
                                    onChange={handleTicketStatusChange}
                                    disabled={statusUpdating}
                                  >
                                    {!ticketStatuses.includes(
                                      String(ticketDetails.status || '').toLowerCase(),
                                    ) && (
                                      <option value="" disabled>
                                        {getDisplayValue(ticketDetails.status)}
                                      </option>
                                    )}
                                    {ticketStatuses.map((status) => (
                                      <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                  {statusUpdating && (
                                    <div className="fs-12 text-muted mt-1" role="status">
                                      Updating status...
                                    </div>
                                  )}
                                </div>
                              ) : role === 'agent' ? (
                                <div className="fs-12 text-muted mt-2">
                                  {unauthorizedTicketUpdateMessage}
                                </div>
                              ) : null}
                              {statusMessage && (
                                <div
                                  className={`alert ${statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'} py-2 px-3 mt-2 mb-0`}
                                  role={statusMessage.type === 'error' ? 'alert' : 'status'}
                                >
                                  {statusMessage.text}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="fs-12 text-muted">Priority</div>
                              <span className={`badge ${getPriorityClass(ticketDetails.priority)}`}>
                                {getDisplayValue(ticketDetails.priority)}
                              </span>
                              {canUpdateTicket ? (
                                <div className="mt-2">
                                  <label
                                    className="form-label fs-12 mb-1"
                                    htmlFor="ticket-priority"
                                  >
                                    Update priority
                                  </label>
                                  <select
                                    id="ticket-priority"
                                    className="form-select"
                                    value={
                                      ticketPriorities.includes(
                                        String(ticketDetails.priority || '').toLowerCase(),
                                      )
                                        ? String(ticketDetails.priority).toLowerCase()
                                        : ''
                                    }
                                    onChange={handleTicketPriorityChange}
                                    disabled={priorityUpdating}
                                  >
                                    {!ticketPriorities.includes(
                                      String(ticketDetails.priority || '').toLowerCase(),
                                    ) && (
                                      <option value="" disabled>
                                        {getDisplayValue(ticketDetails.priority)}
                                      </option>
                                    )}
                                    {ticketPriorities.map((priority) => (
                                      <option key={priority} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                  {priorityUpdating && (
                                    <div className="fs-12 text-muted mt-1" role="status">
                                      Updating priority...
                                    </div>
                                  )}
                                </div>
                              ) : role === 'agent' ? (
                                <div className="fs-12 text-muted mt-2">
                                  {unauthorizedTicketUpdateMessage}
                                </div>
                              ) : null}
                              {priorityMessage && (
                                <div
                                  className={`alert ${priorityMessage.type === 'success' ? 'alert-success' : 'alert-danger'} py-2 px-3 mt-2 mb-0`}
                                  role={priorityMessage.type === 'error' ? 'alert' : 'status'}
                                >
                                  {priorityMessage.text}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="fs-12 text-muted">Customer</div>
                            <div>
                              {getPersonName(
                                ticketDetails.customer ??
                                  ticketDetails.customerInfo ??
                                  ticketDetails.customerDetails ??
                                  ticketDetails.customerId ??
                                  ticketDetails.requester,
                                ticketDetails.customerName,
                                ticketDetails.customerEmail,
                              )}
                            </div>
                            {getDisplayValue(
                              ticketDetails.customer?.email ??
                                ticketDetails.customerInfo?.email ??
                                ticketDetails.customerDetails?.email ??
                                ticketDetails.customerId?.email ??
                                ticketDetails.customerEmail,
                              '',
                            ) !== 'Not provided' && (
                              <div className="fs-12 text-muted">
                                {getDisplayValue(
                                  ticketDetails.customer?.email ??
                                    ticketDetails.customerInfo?.email ??
                                    ticketDetails.customerDetails?.email ??
                                    ticketDetails.customerId?.email ??
                                    ticketDetails.customerEmail,
                                )}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="fs-12 text-muted">Assigned Agent</div>
                            <div>
                              {getPersonName(
                                ticketDetails.assignedAgent ??
                                  ticketDetails.assignedAgentId ??
                                  ticketDetails.assignedTo ??
                                  ticketDetails.assignedToId ??
                                  ticketDetails.agent ??
                                  ticketDetails.agentId,
                                ticketDetails.assignedAgentName,
                                ticketDetails.agentName,
                              )}
                            </div>
                          </div>
                          {role === 'admin' && (
                            <div>
                              <label
                                className="form-label fs-12 mb-1"
                                htmlFor="ticket-agent"
                              >
                                Assign Agent
                              </label>
                              {agentsLoading ? (
                                <div role="status">Loading agents...</div>
                              ) : agentsError ? (
                                <div className="alert alert-danger py-2 px-3 mb-2" role="alert">
                                  {agentsError}
                                </div>
                              ) : agents.length === 0 ? (
                                <div className="text-muted">
                                  No agents are available to assign.
                                </div>
                              ) : (
                                <div className="d-flex flex-wrap gap-2">
                                  <select
                                    id="ticket-agent"
                                    className="form-select"
                                    value={selectedAgentId}
                                    onChange={(event) =>
                                      setSelectedAgentId(event.target.value)
                                    }
                                    disabled={assignmentUpdating}
                                  >
                                    <option value="" disabled>
                                      Select an agent
                                    </option>
                                    {agents.map((agent) => (
                                      <option key={agent._id} value={agent._id}>
                                        {agent.name}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleTicketAssignment}
                                    disabled={assignmentUpdating || !selectedAgentId}
                                  >
                                    {assignmentUpdating ? 'Assigning...' : 'Assign'}
                                  </button>
                                </div>
                              )}
                              {assignmentMessage && (
                                <div
                                  className={`alert ${assignmentMessage.type === 'success' ? 'alert-success' : 'alert-danger'} py-2 px-3 mt-2 mb-0`}
                                  role={assignmentMessage.type === 'error' ? 'alert' : 'status'}
                                >
                                  {assignmentMessage.text}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : loading ? (
                  <div className="card stretch stretch-full">
                    <div className="card-body">Loading tickets...</div>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger" role="alert">{error}</div>
                ) : tickets.length === 0 ? (
                  <div className="card stretch stretch-full">
                    <div className="card-body">No tickets found.</div>
                  </div>
                ) : (
                  <div className="card stretch stretch-full">
                    <div className="card-header">
                      <h5 className="mb-0">
                        {role === 'admin' ? 'All Tickets' : 'My Tickets'}
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        {tickets.map((ticket, index) => {
                          const ticketId = normalizeId(
                            ticket?._id ?? ticket?.id ?? ticket?.ticketId,
                          );
                          const priority = getTicketValue(
                            ticket?.priority,
                            'Normal',
                          );
                          const status = getTicketValue(ticket?.status, 'Open');
                          const title = getTicketValue(
                            ticket?.subject ?? ticket?.title ?? ticket?.name,
                            'Untitled ticket',
                          );
                          const description = getTicketValue(
                            ticket?.description ??
                              ticket?.summary ??
                              ticket?.message,
                            'No description provided.',
                          );

                          return (
                            <li
                              key={ticketId || `ticket-${index}`}
                              className={`single-task-list p-3 ${index === tickets.length - 1 ? 'mb-0' : 'mb-3'} border border-dashed rounded-3`}
                            >
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3 me-3">
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="lh-base"><i className="feather-life-buoy"></i></div>
                                    <a
                                      href="#ticket-details"
                                      className="single-task-list-link"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        if (
                                          (role === 'admin' || role === 'agent') &&
                                          ticketId
                                        ) {
                                          setShowTicketDetails(true);
                                          setSelectedTicketId(ticketId);
                                        } else {
                                          setShowTicketDetails(true);
                                          setSelectedTicketId('');
                                          setTicketDetails(null);
                                          setDetailsLoading(false);
                                          setDetailsError('This ticket has an invalid ID.');
                                        }
                                      }}
                                    >
                                      <div className="fs-13 fw-bold text-truncate-1-line">
                                        {title}{' '}
                                        <span className={`ms-2 badge ${getPriorityClass(priority)}`}>
                                          {priority}
                                        </span>
                                      </div>
                                      <div className="fs-12 fw-normal text-muted text-truncate-1-line">
                                        {description}
                                      </div>
                                    </a>
                                  </div>
                                </div>

                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                  <div className={`badge ${getPriorityClass(status)} d-md-inline-block d-none`}>
                                    {status}
                                  </div>
                                  <div className="d-md-inline-block d-none me-3">
                                    {getTicketDate(ticket)}
                                  </div>
                                  {role === 'admin' && (
                                    <div className="dropdown">
                                      <button
                                        type="button"
                                        className="avatar-text avatar-md"
                                        data-bs-toggle="dropdown"
                                        aria-label={`Actions for ${title}`}
                                        disabled={deletingTicketId === ticketId}
                                      >
                                        {deletingTicketId === ticketId ? (
                                          <span className="fs-10">...</span>
                                        ) : (
                                          <i className="feather-more-vertical"></i>
                                        )}
                                      </button>
                                      <div className="dropdown-menu dropdown-menu-end">
                                        <button
                                          type="button"
                                          className="dropdown-item text-danger"
                                          disabled={Boolean(deletingTicketId)}
                                          onClick={() =>
                                            handleDeleteTicket(ticketId, title)
                                          }
                                        >
                                          <i className="feather-trash-2 me-3"></i>
                                          <span>
                                            {deletingTicketId === ticketId
                                              ? 'Deleting...'
                                              : 'Delete ticket'}
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Ticket;
