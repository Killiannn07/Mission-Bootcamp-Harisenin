import { useState } from "react";
import Button from "../ui/Button";

const MovieModal = ({ open, onClose, onSave, selectedMovie }) => {
  if (!open) return null;

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    rating: "",
    year: "",
    ageRating: "13+",
    duration: "",
    genres: "",
    badge: false,
    topTen: false,
    type: "film",
    newRelease: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData({
      title: "",
      image: "",
      rating: "",
      year: "",
      ageRating: "13+",
      duration: "",
      genres: "",
      badge: false,
      topTen: false,
      type: "film",
      newRelease: false,
    });
  };

  const posterOptions = [
    "./images/potrait1.png",
    "./images/potrait2.png",
    "./images/potrait3.png",
    "./images/potrait4.png",
    "./images/potrait5.png",
    "./images/potrait6.png",
    "./images/potrait8.png",
    "./images/potrait9.png",
    "./images/potrait10.png",
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#181A1C] rounded-xl w-125 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tambah Film</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Judul Film"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            
          />

          <select
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          >
            <option value="">Pilih Poster</option>

            {posterOptions.map((poster) => (
              <option key={poster} value={poster}>
                {poster.split("/").pop()}
              </option>
            ))}
          </select>
          {formData.image && (
            <div className="flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 rounded-lg"
              />
            </div>
          )}

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Tahun"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Durasi"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <input
            type="text"
            name="genres"
            placeholder="Genre (pisahkan dengan koma)"
            value={formData.genres}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          >
            <option value="film">Film</option>
            <option value="series">Series</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="newRelease"
              checked={formData.newRelease}
              onChange={handleChange}
            />

            <label>New Release</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="badge"
              checked={formData.badge}
              onChange={handleChange}
            />

            <label>New Episode</label>
          </div>
          <Button type="submit">{selectedMovie ? "Update" : "Simpan"}</Button>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
