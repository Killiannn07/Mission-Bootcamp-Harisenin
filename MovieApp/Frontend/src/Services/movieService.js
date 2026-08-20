import api from "./api";

export const getMovie = async (search = "") => {
  const res = await api.get("/content", { params: { search } });
  return res.data.data;
};

export const updateMovie = async (id, movie) => {
  const res = await api.put(`/content/${id}`, movie);
  return res.data.data;
};

export const createMovie = async (movie) => {
  try {
    const res = await api.post("/content", movie);
    return res.data.data;
  } catch (error) {
    console.log("CREATE CONTENT ERROR:");
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    throw error;
  }
};

export const deleteMovie = async (id) => {
  const res = await api.delete(`/content/${id}`);
  return res.data;
};
