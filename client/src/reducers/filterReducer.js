import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const initialState = {
  token: "",
  loading: false,
  error: "",
  success: "",
  result: [],
};

// export const searchFilter = createAsyncThunk("searchfilter", async (body) => {
//   console.log("search body redux", body);
//   const result = await axios.post(`${baseUrl}/api/search/property`, body);
//   console.log("redux result", result);
//   return result;
// });
export const searchFilter = createAsyncThunk("searchfilter", async (body) => {
  console.log("address", body);
  const result = await axios.post(`${baseUrl}/api/admin/search`, body);
  console.log("redux result", result);
  return result;
});
export const searchFilters = createAsyncThunk("searchfilters", async (body) => {
  console.log("address", body);
  const result = await axios.post(`${baseUrl}/api/search/property`, body);
  console.log("redux result", result);
  return result;
});
export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: {
    [searchFilter.fulfilled]: (state, { payload }) => {
      // console.log("redux payload", payload);
      console.log("redux action", payload.data?.result);
      if (payload?.data.message === "property not found") {
        state.error = payload.data?.message;
        state.success = false;
        state.loading = false;
      } else if (payload?.data.message === "result found") {
        state.error = false;
        state.loading = false;
        state.success = payload.data?.message;
        state.result = payload.data?.result;
      }
    },
    [searchFilter.pending]: (state, action) => {
      state.loading = true;
    },
    [searchFilters.fulfilled]: (state, { payload }) => {
      // console.log("redux payload", payload);
      console.log("redux action", payload.data?.result);
      if (payload?.data.message === "property not found") {
        state.error = payload.data?.message;
        state.success = false;
        state.loading = false;
      } else if (payload?.data.message === "result found") {
        state.error = false;
        state.loading = false;
        state.success = payload.data?.message;
        state.result = payload.data?.result;
      }
    },
    [searchFilters.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
export default filterReducer.reducer;
