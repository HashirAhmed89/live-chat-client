import { useState } from "react";
import Navbar from "../Components/navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/sidebar";

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