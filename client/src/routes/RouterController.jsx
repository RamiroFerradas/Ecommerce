import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/components/Admin";
import Products from "../pages/Home/components/Products";
import Spinner from "../components/Spinner";
import useAuthUsers from "../hooks/useAuthUsers";
import Users from "../pages/Users/components/Users";

function RouterController() {
  const { isLoading, isAuthenticated } = useAuthUsers();
  if (isLoading) {
    return <Spinner />;
  }

  const component = isAuthenticated ? <Admin /> : <Products />;

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route
        path="/admin"
        element={isAuthenticated ? <Admin /> : <Products />}
      />
      <Route
        path="/users"
        element={isAuthenticated ? <Users /> : <Products />}
      />
    </Routes>
  );
}

export { RouterController };
