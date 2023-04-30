import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/components/Home";
import Admin from "../pages/Admin/components/Admin";
import { useAuth0 } from "@auth0/auth0-react";
function RouterController() {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={isAuthenticated ? `/admin` : `/`} element={<Admin />} />
    </Routes>
  );
}

export { RouterController };
