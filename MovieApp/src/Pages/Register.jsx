import React from "react";
import { AuthForm } from "../Components/ui/AuthForm";
import { AuthLayout } from "../Components/layout/AuthLayout";
import registerBg from "/background-register.jpg"

export const RegisterPage = () => {
  return (
    <AuthLayout background={registerBg}>
      <AuthForm/>
    </AuthLayout>
  );
};
