import Products from "./Products";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Products />
    </div>
  );
};

export default Home;
