import React from "react";
import { getSeries } from "../../data/movie";
import { MovieCardLandscape } from "./MovieCard";
import Carousel from "../ui/Carousel";


export const ContinueMovie = () => {
  return (
    <div className="px-5 md:px-20 pb-5 md:pb-10">
      <h2 className="mb-5 md:mb-8 font-bold text-xl md:text-3xl text-left">
        Continue Movie
      </h2>
      <Carousel
        items={getSeries()}
        scrollAmount={210}
        renderCard={(movie) => (
          <div key={movie.id} className="shrink-0 w-75 aspect-video">
            <MovieCardLandscape {...movie} />
          </div>
        )}
      />
    </div>
  );
};
