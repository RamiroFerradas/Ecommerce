import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  const hideUserMenu = (e) => {
    const userMenu = document.getElementById("userMenu");
    const sidebar_menu = document.getElementById("sidebar_menu");
    if (userMenu) {
      userMenu.classList?.add("hidden");
    }
  };
  return (
    <div onClick={hideUserMenu}>
      <Navbar />
      <RouterController />
    </div>
  );
}
