import api from "./api";

export const getMovie = async () => {
    const res = await api.get("/content")
    return res.data.data
}

export const updateMovie = async (id, movie) => {
    const res = await api.put(`/content/${id}`, movie)
    return res.data.data
}

export const createMovie = async (movie) => {
    const res =await api.post("/content", movie)
    return res.data.data
} 

export const deleteMovie = async (id) => {
    const res = await api.delete(`/content/${id}`)
    return res.data
}