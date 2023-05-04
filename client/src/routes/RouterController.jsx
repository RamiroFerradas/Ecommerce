import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/components/Admin";
import Products from "../pages/Home/components/Products";
function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path={`/admin`} element={<Admin />} />
    </Routes>
  );
}

export { RouterController };
