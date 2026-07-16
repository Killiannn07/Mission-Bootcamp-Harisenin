import React from "react";

export const AuthLayout = ({ background, children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {children}
    </div>
  );
};
