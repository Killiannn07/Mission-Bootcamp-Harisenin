import React from "react";
import { AuthForm } from "../Components/ui/AuthForm";
import { AuthLayout } from "../Components/layout/AuthLayout";
import LoginBg from "/background-login.jpg"

export const LoginPage = () => {
  return (
    <AuthLayout background={LoginBg}>
      <AuthForm type={"login"}/>
    </AuthLayout>
  );
};
