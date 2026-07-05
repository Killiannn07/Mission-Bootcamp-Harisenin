import React from "react";
import Carousel from "../ui/Carousel";
import { getFilms } from "../../data/movie";
import { MovieCardPotrait } from "./MovieCard";

export const FilmSection = ({ text, movie }) => {
  return (
    <div className="px-5 md:px-20 pb-5 md:pb-10" >
      <h2 className="mb-5 md:mb-8 font-bold text-xl md:text-3xl text-left">{text}</h2>
      <Carousel
        items={movie}
        scrollAmount={210}
        renderCard={(movie) => (
          <div
            key={movie.id}
            className="shrink-0 w-24 md:w-56  relative z-0 overflow-visible transition-transform duration-300 hover:z-50 hover:-translate-y-2"
          >
            <MovieCardPotrait {...movie} />
          </div>
        )}
      />
    </div>
  );
};
