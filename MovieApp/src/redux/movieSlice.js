import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../Services/movieService";

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  const data = await getMovie();
  return data;
});

export const addMovies = createAsyncThunk("movie/addMovie", async (movie) => {
  const data = await createMovie(movie);
  return data;
});

export const editMovies = createAsyncThunk(
  "movie/edit",
  async ({ id, movie }) => {
    const data = await updateMovie(id, movie);
    return data;
  },
);

export const deleteMovies = createAsyncThunk("movie/delete", async (id) => {
  await deleteMovie(id);
  return id;
});

const initialState = {
  movieList: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovies.fulfilled, (state, action) => {
        state.movieList.push(action.payload);
        state.error = null;
      })
      .addCase(addMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMovies.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movieList.findIndex(
          (movie) => movie.id === action.payload.id,
        );

        if (index !== -1) {
          state.movieList[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieList = state.movieList.filter(
          (movie) => movie.id !== action.payload,
        );
      })
      .addCase(deleteMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
