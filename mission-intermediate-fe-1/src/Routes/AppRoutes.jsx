import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { HomePage } from "../Pages/HomePage";
import { ProfilPage } from "../Pages/Profil";
import { DaftarFilm } from "../Pages/DaftarFilm";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/profil" element={<ProfilPage/>} />
      <Route path="/daftarfilm" element={<DaftarFilm/>} />

    </Routes>
  );
};
