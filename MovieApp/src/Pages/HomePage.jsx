import React, { useState } from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import { Hero } from "../Components/movie/Hero";
import { ContinueMovie } from "../Components/movie/ContinueMovie";
import { FilmSection } from "../Components/movie/Film Section";
import { movies } from "../data/movie";
import { ManageMovieSection } from "../Components/movie/ManageMovieSection";
import MovieModal from "../Components/movie/MovieModal";

export const HomePage = () => {
  const [movieList, setMovieList] = useState(movies);

  const [showModal, setShowModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const films = movieList.filter((movie) => movie.type === "film");

  const topTen = movieList.filter((movie) => movie.topTen);

  const newRelease = movieList.filter((movie) => movie.newRelease);

  const series = movieList.filter((movie) => movie.type === "series");

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
      <Hero />
      <ContinueMovie />
      <FilmSection text="Top Film dan Series Hari ini" movie={films} />
      <FilmSection text="Film Trending" movie={topTen} />
      <FilmSection text="Rilis Baru" movie={newRelease} />
      <ManageMovieSection
        movieList={movieList}
        onAdd={() => {
          setSelectedMovie(null);
          setShowModal(true);
        }}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
      />
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
