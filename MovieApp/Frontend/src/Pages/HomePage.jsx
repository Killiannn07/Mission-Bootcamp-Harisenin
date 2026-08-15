import React, { useEffect, useState } from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import { Hero } from "../Components/movie/Hero";
import { ContinueMovie } from "../Components/movie/ContinueMovie";
import { FilmSection } from "../Components/movie/Film Section";
import { ManageMovieSection } from "../Components/movie/ManageMovieSection";
import MovieModal from "../Components/movie/MovieModal";
import { deleteMovie } from "../Services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, deleteMovies, editMovies, fetchMovies } from "../redux/movieSlice";
import { getCurrentUser } from "../Services/authService";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const { movieList, loading, error } = useSelector((state) => state.movie);

  const [showModal, setShowModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const films = movieList.filter((movie) => movie.type === "film");

  const topTen = movieList.filter((movie) => movie.topTen);

  const newRelease = movieList.filter((movie) => movie.newRelease);

  const series = movieList.filter((movie) => movie.type === "series");

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  const handleSaveMovie = async (movieData) => {
    const movie = {
      ...movieData,
      genres: movieData.genres.split(",").map((genre) => genre.trim()),
      episodes: movieData.type === "series" ? 16 : null,
      duration: movieData.type === "film" ? movieData.duration : null,
      badge: movieData.badge ? true : false,
      newRelease: movieData.newRelease ? true : false,
    };

    try {
      if (selectedMovie) {
        await dispatch(editMovies({id: selectedMovie.id, movie}));
      } else {
        await dispatch(addMovies(movie));
      }
      setShowModal(false);
      setSelectedMovie(null);
    } catch (error) {
      console.log("Gagal save movie", error);
    }
  };

  useEffect(() => {
    dispatch(fetchMovies());
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [dispatch]);

  const handleDeleteMovie = async (id) => {
    try {
      await dispatch(deleteMovies(id));
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
      {isAdmin && (
        <ManageMovieSection
          movieList={movieList}
          onAdd={() => {
            setSelectedMovie(null);
            setShowModal(true);
          }}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
        />
      )}
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
