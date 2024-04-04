import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Character } from "./app/character/Character.tsx";

export const PublicRoutes = () => (
  <Routes>
    <Route path="/character/:id" element={<Character />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);