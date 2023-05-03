import Sidebar from "../components/Sidebar.jsx";
import Products from "../components/Products.jsx";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Products />
    </div>
  );
};

export default Home;
