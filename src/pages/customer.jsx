import './customer.css';

const customerList = [
  {
    id: 'checkBox_1',
    name: 'Alexandra Della',
    email: 'alex.della@outlook.com',
    avatar: '1.png',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Promotions', 'High Budget'],
    phone: '+1 (375) 9632 548',
    phoneHref: 'tel:+13759632548',
    date: '2023-04-05, 00:05PM',
    status: 'Active',
    statusValue: 'success',
    color: '',
  },
  {
    id: 'checkBox_2',
    name: 'Green Cute',
    email: 'green.cute@outlook.com',
    avatar: '2.png',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Personal', 'Promotions'],
    phone: '(845) 9632 874',
    phoneHref: 'tel:+18459632874',
    date: '2023-04-08, 08:34PM',
    status: 'Active',
    statusValue: 'success',
    color: '',
  },
  {
    id: 'checkBox_3',
    name: 'Rina Sinski',
    email: 'rina.sinski@outlook.com',
    avatar: '3.png',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Team', 'Updates'],
    phone: '(456) 6547 524',
    phoneHref: 'tel:+14566547524',
    date: '2023-04-12, 12:02PM',
    status: 'Active',
    statusValue: 'success',
    color: '',
  },
  {
    id: 'checkBox_4',
    name: 'Henry Leach',
    email: 'henry.leach@outlook.com',
    avatar: '',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Primary', 'Updates', 'Personal'],
    phone: '(845) 9632 874',
    phoneHref: 'tel:+18459632874',
    date: '2023-04-08, 08:34PM',
    status: 'Active',
    statusValue: 'success',
    color: 'teal',
  },
  {
    id: 'checkBox_5',
    name: 'Joan Mello',
    email: 'joan.mello@outlook.com',
    avatar: '4.png',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Bugs', 'Team', 'Updates'],
    phone: '(254) 4587 903',
    phoneHref: 'tel:+12544587903',
    date: '2023-04-16, 05:11PM',
    status: 'Active',
    statusValue: 'success',
    color: '',
  },
  {
    id: 'checkBox_6',
    name: 'Nancy Elliot',
    email: 'nancy.elliot@outlook.com',
    avatar: '',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Bugs', 'Team', 'Updates'],
    phone: '(375) 8523 456',
    phoneHref: 'tel:+13758523456',
    date: '2023-04-15, 02:40PM',
    status: 'Active',
    statusValue: 'success',
    color: 'warning',
  },
  {
    id: 'checkBox_7',
    name: 'Leach Henry',
    email: 'leach.henry@outlook.com',
    avatar: '',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['VIP', 'Bugs'],
    phone: '(951) 5478 884',
    phoneHref: 'tel:+19515478884',
    date: '2023-04-14, 03:32PM',
    status: 'Active',
    statusValue: 'success',
    color: 'success',
  },
  {
    id: 'checkBox_8',
    name: 'Elliot Nancy',
    email: 'elliot.nancy@outlook.com',
    avatar: '',
    groups: ['VIP', 'Bugs', 'Team', 'Primary', 'Updates', 'Personal', 'Promotions', 'Customs', 'Wholesale', 'Low Budget', 'High Budget'],
    selectedGroups: ['Personal', 'Low Budget'],
    phone: '(554) 2478 663',
    phoneHref: 'tel:+15542478663',
    date: '2023-04-22, 02:12PM',
    status: 'Active',
    statusValue: 'success',
    color: 'primary',
  },
];

const tagOptions = [
  { label: 'VIP', value: 'VIP', color: 'bg-success' },
  { label: 'Bugs', value: 'Bugs', color: 'bg-info' },
  { label: 'Team', value: 'Team', color: 'bg-primary' },
  { label: 'Primary', value: 'Primary', color: 'bg-teal' },
  { label: 'Updates', value: 'Updates', color: 'bg-success' },
  { label: 'Personal', value: 'Personal', color: 'bg-warning' },
  { label: 'Promotions', value: 'Promotions', color: 'bg-danger' },
  { label: 'Customs', value: 'Customs', color: 'bg-indigo' },
  { label: 'Wholesale', value: 'Wholesale', color: 'bg-primary' },
  { label: 'Low Budget', value: 'Low Budget', color: 'bg-danger' },
  { label: 'High Budget', value: 'High Budget', color: 'bg-teal' },
];

const statusOptions = [
  { label: 'Active', value: 'success' },
  { label: 'Inactive', value: 'warning' },
  { label: 'Declined', value: 'danger' },
];

const getInitials = (name) => name
  .split(' ')
  .map((part) => part[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

const Customer = () => {
  return (
    <>
      <main className="main-content customer-page">
        <div className="row">
          <div className="col-lg-12">
            <section className="card customer-card">
              <div className="customer-card__header">
                <div>
                  <h1 className="customer-card__title">Customers</h1>
                  <p className="customer-card__description">View and manage your customer contacts.</p>
                </div>
                <span className="customer-card__count">{customerList.length} customers</span>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive customer-table-wrap">
                  <table className="table table-hover customer-table" id="customerList">
                    <thead>
                      <tr>
                        <th className="customer-table__checkbox">
                          <input type="checkbox" className="form-check-input" id="checkAllCustomer" aria-label="Select all customers" />
                        </th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customerList.map((item) => (
                        <tr key={item.id} className="single-item customer-table__row">
                          <td className="customer-table__checkbox">
                            <input type="checkbox" className="form-check-input checkbox" id={item.id} aria-label={`Select ${item.name}`} />
                          </td>

                          <td>
                            <a href="customers-view.html" className="customer-person">
                              {item.avatar ? (
                                <div className="avatar-image avatar-md customer-person__avatar">
                                  <img src={`assets/images/avatar/${item.avatar}`} alt={`${item.name}'s avatar`} className="img-fluid" />
                                </div>
                              ) : (
                                <div className={`avatar-image avatar-md customer-person__avatar customer-person__avatar--${item.color || 'info'}`}>
                                  {getInitials(item.name)}
                                </div>
                              )}
                              <span className="customer-person__name">{item.name}</span>
                            </a>
                          </td>

                          <td>
                            <a className="customer-email" href="apps-email.html">{item.email}</a>
                          </td>

                          <td>
                            <select
                              className="form-select form-control max-select customer-groups-select"
                              data-select2-selector="tag"
                              data-max-select2="tag"
                              aria-label={`Groups for ${item.name}`}
                              multiple
                              defaultValue={item.selectedGroups}
                            >
                              {tagOptions.map((tag) => (
                                <option
                                  key={tag.value}
                                  value={tag.value}
                                  data-bg={tag.color}
                                >
                                  {tag.label}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <a className="customer-contact" href={item.phoneHref}>{item.phone}</a>
                          </td>

                          <td className="customer-date">{item.date}</td>

                          <td>
                            <select
                              className={`form-select form-control customer-status-select customer-status-select--${item.statusValue}`}
                              data-select2-selector="status"
                              aria-label={`Status for ${item.name}`}
                              defaultValue={item.statusValue}
                            >
                              {statusOptions.map((status) => (
                                <option key={status.value} value={status.value} data-bg={`bg-${status.value}`}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <div className="customer-actions">
                              <a href="customers-view.html" className="avatar-text avatar-md customer-action" aria-label={`View ${item.name}`}>
                                <i className="feather feather-eye"></i>
                              </a>

                              <div className="dropdown">
                                <a href="#" className="avatar-text avatar-md customer-action" aria-label={`More actions for ${item.name}`} data-bs-toggle="dropdown" data-bs-offset="0,21">
                                  <i className="feather feather-more-horizontal"></i>
                                </a>
                                <ul className="dropdown-menu customer-action-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="feather feather-edit-3 me-3"></i>
                                      <span>Edit</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item printBTN" href="#">
                                      <i className="feather feather-printer me-3"></i>
                                      <span>Print</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="feather feather-clock me-3"></i>
                                      <span>Remind</span>
                                    </a>
                                  </li>
                                  <li className="dropdown-divider"></li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="feather feather-archive me-3"></i>
                                      <span>Archive</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="feather feather-alert-octagon me-3"></i>
                                      <span>Report Spam</span>
                                    </a>
                                  </li>
                                  <li className="dropdown-divider"></li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="feather feather-trash-2 me-3"></i>
                                      <span>Delete</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Customer;
