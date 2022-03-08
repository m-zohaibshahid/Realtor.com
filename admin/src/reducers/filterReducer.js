import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const initialState = {
  token: "",
  loading: false,
  isAuth: false,
  error: "",
  success: "",
  result: [],
  Filter: [],
};

export const searchFilter = createAsyncThunk("searchfilter", async (body) => {
  console.log("address", body);
  const result = await axios.post(`${baseUrl}/api/admin/search`, body);
  console.log("redux result", result);
  return result;
});

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: {
    [searchFilter.pending]: (state, action) => {
      state.loading = true;
    },
    [searchFilter.fulfilled]: (state, { payload }) => {
      console.log("message of filter-property", payload.data.result);
      state.loading = false;
      state.Filter = payload.data.result;
      return state;
    },
  },
});
export const {
  addToken,
  Logout,
  storeToken,
  loginPending,
  loginSuccess,
  loginFail,
} = filterReducer.actions;
export default filterReducer.reducer;
