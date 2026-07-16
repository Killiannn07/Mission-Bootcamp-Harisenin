import { configureStore } from "@reduxjs/toolkit";
import reducer from "../redux/movieSlice";

export const store = configureStore({
  reducer: {
    movie: reducer,
  },
});
