import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "../pages/Home/components/Home";
import Admin from "../pages/Admin/components/Admin";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
function RouterController() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/admin" && !isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`/admin`} element={<Admin />} />
    </Routes>
  );
}

export { RouterController };
