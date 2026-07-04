import { FaEdit, FaTrash } from "react-icons/fa";

export const ManageMovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full aspect-2/3 object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold">{movie.title}</h3>

        <p className="text-sm text-gray-400">★ {movie.rating}</p>

        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={onEdit}
            className="flex w-1/2 justify-center items-center bg-yellow-500 py-2 rounded cursor-pointer"
          >
            <FaEdit size={20} />
          </button>

          <button
            onClick={onDelete}
            className="flex w-1/2 items-center justify-center bg-red-600 py-2 rounded cursor-pointer"
          >
            <FaTrash size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};
