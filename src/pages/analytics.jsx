import React from 'react'

const Analytics = () => {
  return (
    <div>
        <div className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="card stretch stretch-full">
            <div className="card-body">
              <div className="hstack justify-content-between mb-4 pb-">
                <div>
                  <h5 className="mb-1">Email Reports</h5>
                  <span className="fs-12 text-muted">Email Campaign Reports</span>
                </div>
                <a href="javascript:void(0);" className="btn btn-light-brand">View Alls</a>
              </div>

              <div className="row analytics-card-grid">
                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope fs-3 text-primary"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">50,545</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Total Email</p>
                    </div>
                  </div>
                </div>

                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope-plus fs-3 text-warning"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">25,000</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Email Sent</p>
                    </div>
                  </div>
                </div>

                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope-check fs-3 text-success"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">20,354</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Emails Delivered</p>
                    </div>
                  </div>
                </div>

                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope-open fs-3 text-indigo"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">12,422</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Emails Opened</p>
                    </div>
                  </div>
                </div>

                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope-heart fs-3 text-teal"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">6,248</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Emails Clicked</p>
                    </div>
                  </div>
                </div>

                <div className="analytics-card-grid__item">
                  <div className="card stretch stretch-full border border-dashed border-gray-5 h-100">
                    <div className="card-body rounded-3 text-center d-flex flex-column justify-content-center h-100">
                      <i className="bi bi-envelope-slash fs-3 text-danger"></i>
                      <div className="fs-4 fw-bolder text-dark mt-3 mb-1">2,047</div>
                      <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">Emails Bounce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  
  );
};

export default Analytics;