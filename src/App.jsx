import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QrEntry from "./pages/QrEntry.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrEntry />} />
        <Route path="/qr" element={<QrEntry />} />
      </Routes>
    </BrowserRouter>
  );
}
