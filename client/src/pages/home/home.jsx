import Products from "../Home/Products";
import Sidebar from "../Home/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Products />
    </div>
  );
};

export default Home;
