import Navbar from "../Components/navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Mainlayout;