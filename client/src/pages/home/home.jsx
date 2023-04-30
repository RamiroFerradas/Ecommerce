import Products from "../Home/Products";
import Sidebar from "../Home/Sidebar";
import ProductModal from "./ProductModal";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Products />
    </div>
  );
};

export default Home;
