import React from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import { movies } from "../data/movie";
import { MovieCardPotrait } from "../Components/movie/MovieCard";

export const DaftarFilm = () => {
  return (
    <MainLayout>
      <div className="py-1.5 px-5 md:py-6 md:px-20">
        <h1 className="text-xl md:text-3xl font-bold text-left mb-4">Daftar Saya</h1>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie) => (
            <MovieCardPotrait key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
