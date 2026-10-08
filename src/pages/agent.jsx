import './customer.css';
import './agent.css';

const sampleAgents = [
  {
    id: 'agent-1',
    name: 'Maya Chen',
    email: 'maya.chen@example.com',
    role: 'Support Lead',
    status: 'Active',
  },
  {
    id: 'agent-2',
    name: 'Jordan Rivera',
    email: 'jordan.rivera@example.com',
    role: 'Support Agent',
    status: 'Active',
  },
  {
    id: 'agent-3',
    name: 'Samira Patel',
    email: 'samira.patel@example.com',
    role: 'Billing Specialist',
    status: 'Pending',
  },
  {
    id: 'agent-4',
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    role: 'Support Agent',
    status: 'Inactive',
  },
];

const getInitials = (name = '') => name
  .split(' ')
  .filter(Boolean)
  .map((part) => part[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

const getStatusClass = (status = '') => {
  const normalizedStatus = status.toLowerCase();

  if (['active', 'success'].includes(normalizedStatus)) return 'success';
  if (['inactive', 'pending', 'warning'].includes(normalizedStatus)) return 'warning';
  if (['declined', 'suspended', 'danger'].includes(normalizedStatus)) return 'danger';
  return 'neutral';
};

const Agent = ({ agents = sampleAgents, onAgentAction }) => (
  <main className="main-content customer-page agent-page">
    <div className="row">
      <div className="col-lg-12">
        <section className="card customer-card">
          <div className="customer-card__header">
            <div>
              <h1 className="customer-card__title">Agents</h1>
              <p className="customer-card__description">View and manage your support agents.</p>
            </div>
            <span className="customer-card__count">
              {agents.length} {agents.length === 1 ? 'agent' : 'agents'}
            </span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive customer-table-wrap">
              <table className="table table-hover customer-table agent-table" id="agentList">
                <thead>
                  <tr>
                    <th className="customer-table__checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkAllAgent"
                        aria-label="Select all agents"
                      />
                    </th>
                    <th>Agent</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length > 0 ? agents.map((agent, index) => (
                    <tr key={agent.id || agent.email || index} className="single-item customer-table__row">
                      <td className="customer-table__checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input checkbox"
                          id={`agent-${index}`}
                          aria-label={`Select ${agent.name}`}
                        />
                      </td>
                      <td>
                        <div className="customer-person">
                          <div className="avatar-image avatar-md customer-person__avatar customer-person__avatar--primary" aria-hidden="true">
                            {getInitials(agent.name)}
                          </div>
                          <span className="customer-person__name">{agent.name}</span>
                        </div>
                      </td>
                      <td>
                        <a className="customer-email" href={`mailto:${agent.email}`}>
                          {agent.email}
                        </a>
                      </td>
                      <td className="agent-role">{agent.role || '—'}</td>
                      <td>
                        <span className={`agent-status-badge agent-status-badge--${getStatusClass(agent.status)}`}>
                          {agent.status || '—'}
                        </span>
                      </td>
                      <td>
                        <div className="customer-actions">
                          <button
                            type="button"
                            className="avatar-text avatar-md customer-action"
                            aria-label={`View ${agent.name}`}
                            onClick={() => onAgentAction?.(agent, 'view')}
                          >
                            <i className="feather feather-eye" aria-hidden="true"></i>
                          </button>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="avatar-text avatar-md customer-action"
                              aria-label={`More actions for ${agent.name}`}
                              data-bs-toggle="dropdown"
                              data-bs-offset="0,21"
                            >
                              <i className="feather feather-more-horizontal" aria-hidden="true"></i>
                            </button>
                            <ul className="dropdown-menu customer-action-menu">
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => onAgentAction?.(agent, 'edit')}
                                >
                                  <i className="feather feather-edit-3 me-3" aria-hidden="true"></i>
                                  <span>Edit agent</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => onAgentAction?.(agent, 'deactivate')}
                                >
                                  <i className="feather feather-user-x me-3" aria-hidden="true"></i>
                                  <span>Deactivate agent</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="agent-table__empty" colSpan={6}>
                        No agents to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
);

export default Agent;
