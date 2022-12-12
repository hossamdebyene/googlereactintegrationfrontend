import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./feature/login/login";
import Event from "./feature/event/event";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Event />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
