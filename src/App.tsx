import { Routes, Route } from "react-router-dom"
import React from 'react';
import Search from "./pages/Search";
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:videoId" element={<Search />} />
    </Routes>
  );
}

export default App;
