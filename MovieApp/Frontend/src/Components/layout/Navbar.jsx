import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo/movie-open.svg";
import chill from "../../assets/logo/CHILL.svg";
import { IoIosArrowDown } from "react-icons/io";
import avatar from "/avatar.png";
import { ProfileDropdown } from "./ProfileDropdown";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" py-1.5 px-5 md:py-6 md:px-20 flex justify-between">
      {/* left side */}
      <div className="flex gap-3 md:gap-10 h-11">
        <div className="flex gap-1">
          <img src={logo} className="w-5 md:w-7" />
          <img src={chill} className="max-sm:hidden w-16" />
        </div>
        <ul className="flex gap-3 md:gap-10 items-center text-10 md:text-lg">
          <li className="cursor-pointer hover:underline">Series</li>
          <li className="cursor-pointer hover:underline">Film</li>
          <li className="cursor-pointer hover:underline">Daftar Saya</li>
        </ul>
      </div>
      {/* right side */}
      <div className="relative flex items-center" ref={dropDownRef}>
        
        <button
          className="cursor-pointer flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={avatar}
            alt="avatar"
            className="h-5 w-5 md:h-10 md:w-10 rounded-[50%]"
          />
          <IoIosArrowDown size={30} />
        </button>
        {isOpen && <ProfileDropdown />}
      </div>

      
    </nav>
  );
};
