import React from "react";
import { ManageMovieCard } from "./ManageMovieCard";
import Button from "../ui/Button";

export const ManageMovieSection = ({ movieList, onAdd, onEdit, onDelete }) => {
  return (
    <section className="px-5 md:px-20 py-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Kelola Film</h2>

        <Button onClick={onAdd}>Tambah Film</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {movieList.map((movie) => (
          <ManageMovieCard
            key={movie.id}
            movie={movie}
            onEdit={() => onEdit(movie)}
            onDelete={() => onDelete(movie.id)}
          />
        ))}
      </div>
    </section>
  );
};
