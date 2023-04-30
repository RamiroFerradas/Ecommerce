import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";

export default function App() {
  return (
    <>
      <Navbar />
      <RouterController />
    </>
  );
}
