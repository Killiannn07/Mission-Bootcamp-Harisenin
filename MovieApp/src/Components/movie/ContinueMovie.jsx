import React from "react";
import { MovieCardLandscape } from "./MovieCard";
import Carousel from "../ui/Carousel";


export const ContinueMovie = ({movies}) => {
  return (
    <div className="px-5 md:px-20 pb-5 md:pb-10">
      <h2 className="mb-5 md:mb-8 font-bold text-xl md:text-3xl text-left">
        Continue Movie
      </h2>
      <Carousel
        items={movies}
        scrollAmount={210}
        renderCard={(movie) => (
          <div
            key={movie.id}
            className="shrink-0 w-75 aspect-video relative z-0 overflow-visible transition-transform duration-300 hover:z-50 hover:-translate-y-2"
          >
            <MovieCardLandscape {...movie} />
          </div>
        )}
      />
    </div>
  );
};
