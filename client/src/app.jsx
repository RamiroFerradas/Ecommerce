import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  const hideUserMenu = () => {
    const userMenu = document.querySelector("#userMenu");
    userMenu.classList.add("hidden");
  };
  return (
    <div onClick={hideUserMenu}>
      <Navbar />
      <RouterController />
    </div>
  );
}
