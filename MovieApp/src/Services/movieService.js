import api from "./api";

export const getMovie = async () => {
    const res = await api.get("/films")
    return res.data
}

export const updateMovie = async (id, movie) => {
    const res = await api.put(`/films/${id}`, movie)
    return res.data
}

export const createMovie = async (movie) => {
    const res =await api.post("/films", movie)
    return res.data
} 

export const deleteMovie = async (id) => {
    const res = await api.delete(`/films/${id}`)
    return res.data
}