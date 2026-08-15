import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { HomePage } from "../Pages/HomePage";
import { ProfilPage } from "../Pages/Profil";
import { DaftarFilm } from "../Pages/DaftarFilm";
import { Langganan } from "../Pages/Langganan";
import { ProtectedRoute } from "./ProtectedRoute";
import VerifyEmail from "../Pages/VerifyEmail";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/resetPassword";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daftarfilm"
        element={
          <ProtectedRoute>
            <DaftarFilm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Subscription"
        element={
          <ProtectedRoute>
            <Langganan />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
