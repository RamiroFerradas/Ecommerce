import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  // loginWithRedirect();
  return (
    <>
      <Navbar />
      <RouterController />
    </>
  );
}
