import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/components/Home";
function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/userpage" element={<UserPage />} /> */}
    </Routes>
  );
}

export { RouterController };
