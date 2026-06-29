import React, { useState } from "react";
import logo from "../../assets/logo/movie-open.svg";
import chill from "../../assets/logo/CHILL.svg";
import { IoIosArrowForward } from "react-icons/io";

export const Footer = () => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const genres = [
    "Aksi",
    "Anak-anak",
    "Anime",
    "Britania",
    "Drama",
    "Fantasi Ilmiah & Fantasi",
    "Kejahatan",
    "KDrama",
    "Komedi",
    "Petualangan",
    "Perang",
    "Romantis",
    "Sains & Alam",
    "Thriller",
  ];

  const helps = ["FAQ", "Kontak Kami", "Privasi", "Syarat & Ketentuan"];

  return (
    <footer className="bg-[#181A1C] border-t border-zinc-700 px-5 py-8 md:px-20 md:py-14">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:items-center">
        {/* Logo */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-6 lg:h-11" />
            <img src={chill} alt="chill" className="h-6 lg:h-11" />
          </div>

          <p className="text-xs text-gray-400 text-left">
            ©2023 Chill All Rights Reserved.
          </p>
        </div>

        {/* Menu */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          {/* Genre */}
          <div>
            <button
              className="flex justify-between items-center md:block w-full cursor-pointer"
              onClick={() => {
                setGenreOpen((prev) => !prev);
              }}
            >
              <h3 className="font-semibold text-left">Genre</h3>

              <IoIosArrowForward className="md:hidden" />
            </button>

            {/* Desktop */}
            <div className="hidden md:inline-grid grid-cols-4 gap-x-7 gap-y-3 mt-4 text-sm text-text-secondary text-left">
              {genres.map((genre) => (
                <a key={genre} href="#" className="hover:text-white">
                  {genre}
                </a>
              ))}
            </div>

            {/* Mobile */}
            {genreOpen && (
              <div className="grid grid-cols-3 gap-3 mt-4 md:hidden text-10 text-text-secondary text-left">
                {genres.map((genre) => (
                  <a key={genre} href="#" className="hover:text-white">
                    {genre}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Bantuan */}
          <div>
            <button
              className="flex justify-between items-center w-full md:block"
              onClick={() => setHelpOpen((prev) => !prev)}
            >
              <h3 className="font-semibold text-left">Bantuan</h3>

              <IoIosArrowForward className="md:hidden" />
            </button>

            {/* Desktop */}
            <div className="hidden md:flex flex-col gap-3 mt-4 text-sm text-text-secondary text-left">
              {helps.map((item) => (
                <a key={item} href="#" className="hover:text-white">
                  {item}
                </a>
              ))}
            </div>

            {/* mobile */}
            {helpOpen && (
              <div className="grid grid-cols-2 gap-3 mt-4 md:hidden text-10 text-text-secondary text-left">
                {helps.map((help) => (
                  <a key={help} href="#" className="hover:text-white">
                    {help}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
