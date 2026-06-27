import React from "react";
import { AuthForm } from "../Components/layout/AuthForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/background-login.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <AuthForm type="login" />
    </div>
  );
};
