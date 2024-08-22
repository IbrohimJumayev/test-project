import { configureStore } from "@reduxjs/toolkit";
import coutriesReducer from "./slices/coutriesSlice";
import likedCountriesReducer from "./slices/likedCountriesSlice";

export const store = configureStore({
  reducer: {
    countries: coutriesReducer,
    liked: likedCountriesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
