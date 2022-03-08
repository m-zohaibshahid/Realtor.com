import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "./helper/fetch";
export const initialState = {
  token: "",
  loading: false,
  isAuth: false,
  error: "",
  success: "",
  user: [],
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  // const result = await axios.post(`${baseUrl}/signup`, body);
  // return result;
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  // const result = await fetch2("/api/login", body, "post");
  // return body.token;
});

export const getUserId = createAsyncThunk("getuserid", async (body) => {
  const result = await fetch2("/getUserData", body, "post");
  return result;
});

export const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },

    // Register actions
    registerPending: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.success = payload.success;
      console.log("reducer message", payload.message);
    },
    registerFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      console.log("reducer error", payload.error);
    },

    // login action
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      console.log("reducer", payload);
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload.result.token;
      state.user = payload.result.user;
      localStorage.setItem("token", payload.result.token);
      console.log("reducer token", payload);
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      console.log("reducer error", payload);
    },
    isMeAuth: (state, { payload }) => {
      state.isAuth = true;
      state.token = localStorage.getItem("token");
      state.user = payload.data;
      localStorage.getItem("token");
      console.log("reducer payload", payload);
      console.log("reducer data", payload.data);
    },
    updateProfile: (state, { payload }) => {
      console.log("reducer payload", payload);
      state.user = payload.data;
      console.log("reducer payload", payload);
      console.log("reducer data", payload.data);
    },
    storeToken: (state, { payload }) => {
      console.log("actionnn", payload.token);
      localStorage.setItem("token", payload.token);
    },
    logoutMe: (state, action) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("reduc wala signup", action.payload.data.error);
      if (action.payload.data.error) {
        state.error = action.payload.data.error;
        state.success = false;
      } else {
        state.error = false;
        state.success = action.payload.data.message;
      }
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.rejected]: (state, action) => {
      // if (action.payload.error) {
      //   state.error = action.payload.error;
      //   state.success = false;
      // }
    },
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        console.log("Error", state.error);
      } else {
        state.token = action.payload.token;
        localStorage.setItem("token", state.token);
      }
    },
    [getUserId.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        console.log("Error", state.error);
      } else {
        state.user = action.payload.user;
      }
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
      console.log("doMatch", state.loading);
    },
  },
});
export const {
  addToken,
  isMeAuth,
  storeToken,
  registerPending,
  registerSuccess,
  registerFail,
  loginPending,
  loginSuccess,
  loginFail,
  logoutMe,
  updateProfile,
} = authReducer.actions;
export default authReducer.reducer;
