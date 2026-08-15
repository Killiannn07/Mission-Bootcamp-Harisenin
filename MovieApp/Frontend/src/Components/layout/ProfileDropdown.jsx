import React from "react";
import { FaUser, FaStar } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/authService";

export const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div
      className="absolute w-max top-15 md:top-20 right-2 bg-background border border-bdr rounded-lg shadow-xl"
    >
      <button
        type="button"
        className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer"
        onClick={() => {
          navigate("/profil");
        }}
      >
        <FaUser size={20} />
        <span>Profil Saya</span>
      </button>

      <button className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer">
        <FaStar size={20} />
        <span>Ubah Premium</span>
      </button>

      <button
        className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer"
        onClick={handleLogout}
      >
        <IoMdExit size={20} />
        <span>Keluar</span>
      </button>
    </div>
  );
};
