import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

import axios from "axios";
const initialState = {
  loading: false,
  error: "",
  message: "",
};

export const ADD_NEWS_LETTER = createAsyncThunk(
  "addNewsLetter",
  async (body) => {
    const result = await axios.post(`${baseUrl}/newsletter/create`, body, {
      // receive two    parameter endpoint url ,form data
    });
    console.log("results", result.data);
    return result.data;
  }
);

export const newsLetterReducer = createSlice({
  name: "newsLetter",
  initialState,
  reducers: {},
  extraReducers: {
    [ADD_NEWS_LETTER.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.message === "success") {
        state.message = action.payload.message;
        state.error = false;
      } else {
        state.error = action.payload.error;
        state.message = false;
      }
    },
    [ADD_NEWS_LETTER.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { storeRentProperty, deleteFail } = newsLetterReducer.actions;
export default newsLetterReducer.reducer;
