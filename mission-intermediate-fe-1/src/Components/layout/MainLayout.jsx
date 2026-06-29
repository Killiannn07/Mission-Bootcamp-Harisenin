import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer/>
    </>
  );
};
