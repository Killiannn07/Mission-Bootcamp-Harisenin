import React, { useState } from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import { movies } from "../data/movie";
import { MovieCardPotrait } from "../Components/movie/MovieCard";
import Button from "../Components/ui/Button";
import MovieModal from "../Components/movie/MovieModal";
import { ManageMovieCard } from "../Components/movie/ManageMovieCard";

export const DaftarFilm = () => {
  const [movieList, setMovieList] = useState(movies);

  const [showModal, setShowModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSaveMovie = (movieData) => {
    const movie = {
      ...movieData,
      genres: movieData.genres.split(",").map((genre) => genre.trim()),
      episodes: movieData.type === "series" ? 16 : null,
      duration: movieData.type === "film" ? movieData.duration : null,
      badge: null,
    };

    if (selectedMovie) {
      // UPDATE
      setMovieList((prev) =>
        prev.map((item) =>
          item.id === selectedMovie.id
            ? {
                ...movie,
                id: selectedMovie.id,
              }
            : item,
        ),
      );
    } else {
      // CREATE
      setMovieList((prev) => [
        ...prev,
        {
          ...movie,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleDeleteMovie = (id) => {
    console.log("delete", id);
    setMovieList((prev) => prev.filter((movie) => movie.id !== id));
  };

  const handleEditMovie = (movie) => {
    console.log("edit", movie);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <MainLayout>
      <div className="py-1.5 px-5 md:py-6 md:px-20">
        <div className="flex justify-between mb-4 md:mb-8 items-center">
          <h1 className="text-xl md:text-3xl font-bold text-left">
            Daftar Saya
          </h1>
          <Button
            onClick={() => {
              setSelectedMovie(null);
              setShowModal(true);
            }}
          >
            Tambah Film
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {movieList.map((movie) => (
            <ManageMovieCard
              key={movie.id}
              movie={movie}
              onDelete={() => handleDeleteMovie(movie.id)}
              onEdit={() => handleEditMovie(movie)}
            />
          ))}
        </div>
      </div>
      <MovieModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMovie(null);
        }}
        onSave={handleSaveMovie}
        selectedMovie={selectedMovie}
      />
    </MainLayout>
  );
};
