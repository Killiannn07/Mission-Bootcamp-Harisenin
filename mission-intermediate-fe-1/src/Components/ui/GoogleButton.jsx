import React from "react";
import LogoGoogle from "../../assets/logo/google.svg"

export const GoogleButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="w-full h-12 rounded-3xl border border-bdr bg-transparent flex items-center justify-center gap-3 cursor-pointer">
      <img src={LogoGoogle} alt="Google" />
      <span>{text}</span>
    </button>
  );
};
