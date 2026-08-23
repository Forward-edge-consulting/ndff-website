import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Registration from "./pages/Registration.jsx";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoute;
