import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/components/Home";
import Admin from "../pages/Admin/components/Admin";
function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`/admin`} element={<Admin />} />
    </Routes>
  );
}

export { RouterController };
