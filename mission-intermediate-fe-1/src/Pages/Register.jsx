import React from "react";
import { AuthForm } from "../Components/layout/AuthForm";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/background-register.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <AuthForm type="register" />
    </div>
  );
};
