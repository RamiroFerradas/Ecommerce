import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  const hideUserMenu = () => {
    const userMenu = document.getElementById("userMenu");
    if (userMenu) {
      userMenu.classList?.add("hidden");
    }
  };

  return (
    <div onClick={hideUserMenu} className="">
      <Navbar />
      <div className="flex w-full justify-center md:items-start items-center md:flex-row flex-col">
        <div className="w-2/12 ">
          <Sidebar />
        </div>
        <div className="w-10/12">
          <RouterController />
        </div>
      </div>
    </div>
  );
}
