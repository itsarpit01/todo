import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-section">
      <Outlet />
    </div>
  );
}