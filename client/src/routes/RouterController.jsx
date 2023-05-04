import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Admin from "../pages/Admin/components/Admin";
import Products from "../pages/Home/components/Products";
import Spinner from "../components/Spinner";

function RouterController() {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <Spinner />;
  }

  const component = isAuthenticated ? <Admin /> : <Products />;

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/admin" element={component} />
    </Routes>
  );
}

export { RouterController };
