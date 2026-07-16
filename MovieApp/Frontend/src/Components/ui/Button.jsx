import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...onclick
}) {
  const variants = {
    primary: "bg-btn-primary text-white",
    secondary: "bg-btn-secondary text-white",
    auth: "w-full h-12 border border-bdr rounded-3xl bg-btn-secondary cursor-pointer",
  };
  return (
    <button
      {...onclick}
      className={`
        flex
        items-center
        justify-center
        gap-2
        rounded-[48px]
        px-3 md:px-6
        py-1 md:py-2.5
        font-bold
        text-[12px] md:text-lg
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
