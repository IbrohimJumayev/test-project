import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils";

interface SelectedCountries {
  cca2: string | number;
}

interface LikedCountriesState {
  liked: SelectedCountries[];
}

const initialState: LikedCountriesState = {
  liked: getFromLocalStorage("liked") ?? [],
};

const LikedCountriesSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<SelectedCountries>) => {
      state.liked.push(action.payload);
      saveToLocalStorage("liked", state.liked);
    },
    remove: (state, action: PayloadAction<string | number>) => {
      state.liked = state.liked.filter((l) => l.cca2 !== action.payload);
      saveToLocalStorage("liked", state.liked);
    },
  },
});

export const { add, remove } = LikedCountriesSlice.actions;
export default LikedCountriesSlice.reducer;
