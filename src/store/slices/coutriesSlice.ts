import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils";

interface CountryName {
  common: string;
  png: string;
  alt: string;
}

interface Country {
  cca2: string | number;
  name: CountryName;
  flags: CountryName;
}

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: getFromLocalStorage("countries") ?? [],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    render: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
      saveToLocalStorage("countries", state.countries);
    },
    remove: (state, action: PayloadAction<string | number>) => {
      state.countries = state.countries.filter(
        (c) => c.cca2 !== action.payload
      );
      saveToLocalStorage("countries", state.countries);
    },
  },
});

export const { render, remove } = countriesSlice.actions;
export default countriesSlice.reducer;
