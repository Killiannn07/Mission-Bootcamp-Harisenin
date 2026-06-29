import React from "react";
import { FaUser, FaStar } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

export const ProfileDropdown = () => {
  return (
    <div
      className="absolute top-15 md:top-20 right-5 md:right-20 bg-background border border-gray-700 rounded-lg shadow-xl
      "
      
    >
      <button className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer">
        <FaUser size={20}  />
        <span>Profil Saya</span>
      </button>

      <button className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer">
        <FaStar size={20} />
        <span>Ubah Premium</span>
      </button>

      <button className="flex items-center gap-4 w-full px-6 py-5 hover:bg-gray-800 hover:text-btn-primary-hover cursor-pointer">
        <IoMdExit size={20} />
        <span>Keluar</span>
      </button>
    </div>
  );
};
