import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../Components/sidebar";

import { Outlet } from "react-router-dom";


const Mainlayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`sidebar-layout${isSidebarOpen ? "" : " sidebar-closed"}`}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <Outlet />
    </div>
  );
};

export default Mainlayout;