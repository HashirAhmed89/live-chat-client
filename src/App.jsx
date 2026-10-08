import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Mainlayout from "./layouts/mainlayout";
import Analytics from "./pages/analytics";
import Conversation from "./pages/Conversation";
import Ticket from "./pages/ticket";
import Customer from "./pages/customer";
import Agent from "./pages/agent";

// const navigationPages = [
//   { path: "/reports-sales", title: "Sales Report" },
//   { path: "/reports-leads", title: "Leads Report" },
//   { path: "/reports-project", title: "Project Report" },
//   { path: "/reports-timesheets", title: "Timesheets Report" },
//   { path: "/proposal", title: "Proposal" },
//   { path: "/proposal-view", title: "Proposal View" },
//   { path: "/proposal-edit", title: "Proposal Edit" },
//   { path: "/proposal-create", title: "Proposal Create" },
//   { path: "/payment", title: "Payment" },
//   { path: "/invoice-view", title: "Invoice View" },
//   { path: "/invoice-create", title: "Invoice Create" },
//   { path: "/customers", title: "Customers" },
//   { path: "/customers-view", title: "Customers View" },
//   { path: "/customers-create", title: "Customers Create" },
//   { path: "/leads", title: "Leads" },
//   { path: "/leads-view", title: "Leads View" },
//   { path: "/leads-create", title: "Leads Create" },
//   { path: "/projects", title: "Projects" },
//   { path: "/projects-view", title: "Projects View" },
//   { path: "/projects-create", title: "Projects Create" },
//   { path: "/widgets-lists", title: "Lists" },
//   { path: "/widgets-tables", title: "Tables" },
//   { path: "/widgets-charts", title: "Charts" },
//   { path: "/widgets-statistics", title: "Statistics" },
//   { path: "/auth-login-cover", title: "Login" },
//   { path: "/auth-login-minimal", title: "Login" },
//   { path: "/auth-login-creative", title: "Login" },
//   { path: "/auth-register-cover", title: "Register" },
//   { path: "/auth-register-minimal", title: "Register" },
//   { path: "/auth-register-creative", title: "Register" },
//   { path: "/auth-404-cover", title: "Error 404" },
//   { path: "/auth-404-minimal", title: "Error 404" },
//   { path: "/auth-404-creative", title: "Error 404" },
//   { path: "/auth-reset-cover", title: "Reset Password" },
//   { path: "/auth-reset-minimal", title: "Reset Password" },
//   { path: "/auth-reset-creative", title: "Reset Password" },
//   { path: "/auth-verify-cover", title: "Verify OTP" },
//   { path: "/auth-verify-minimal", title: "Verify OTP" },
//   { path: "/auth-verify-creative", title: "Verify OTP" },
//   { path: "/auth-maintenance-cover", title: "Maintenance" },
//   { path: "/auth-maintenance-minimal", title: "Maintenance" },
//   { path: "/auth-maintenance-creative", title: "Maintenance" },
// ];

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Mainlayout />}>
        <Route
          path="/"
          element={
            <div>
              <h1>Home Page</h1>
            </div>
          }
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ticket" element={<Ticket/>}/>
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/agent" element={<Agent/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
