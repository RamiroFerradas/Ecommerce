import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./pages/Home/components/Sidebar";
import { RouterController } from "./routes/RouterController";
import auth0 from "auth0-js";
import { useEffect, useState } from "react";
import axios from "axios";

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
