import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  const hideUserMenu = (e) => {
    const userMenu = document.getElementById("userMenu");
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
