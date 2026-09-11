import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Topbar />
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}