import React, { useEffect, useState } from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import { Hero } from "../Components/movie/Hero";
import { ContinueMovie } from "../Components/movie/ContinueMovie";
import { FilmSection } from "../Components/movie/Film Section";
import { movies } from "../data/movie";
import { ManageMovieSection } from "../Components/movie/ManageMovieSection";
import MovieModal from "../Components/movie/MovieModal";
import {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../Services/movieService";

export const HomePage = () => {
  const [movieList, setMovieList] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const films = movieList.filter((movie) => movie.type === "film");

  const topTen = movieList.filter((movie) => movie.topTen);

  const newRelease = movieList.filter((movie) => movie.newRelease);

  const series = movieList.filter((movie) => movie.type === "series");

  const handleSaveMovie = async (movieData) => {
    const movie = {
      ...movieData,
      genres: movieData.genres.split(",").map((genre) => genre.trim()),
      episodes: movieData.type === "series" ? 16 : null,
      duration: movieData.type === "film" ? movieData.duration : null,
      badge: movieData.badge ? "New episode" : null,
    };

    try {
      if (selectedMovie) {
        await updateMovie(selectedMovie.id, movie);
      } else {
        await createMovie(movie);
      }

      await fetchMovie();

      setShowModal(false);
      setSelectedMovie(null);
    } catch (error) {
      console.log("Gagal save movie", error);
    }
  };

  const fetchMovie = async () => {
    try {
      const data = await getMovie();

      setMovieList(data);
    } catch (error) {
      console.log("Gagal load movie", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  });

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      await fetchMovie();
    } catch (error) {
      console.log("Gagal delete", error);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <MainLayout>
      <Hero />
      <ContinueMovie movies={series} />
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
