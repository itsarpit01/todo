import { BrowserRouter } from "react-router-dom";
import Navbar from "./pages/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <div className="page-content">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}