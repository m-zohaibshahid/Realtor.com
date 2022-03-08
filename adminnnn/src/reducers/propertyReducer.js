import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch5, fetch3 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

const initialState = {
  property: [],
  AllProperties: [],
  SaleProperty: [],
  RentProperty: [],
  blog: [],
  loading: false,
  error: "",
  message: "",
  status: "",
};

export const ADD_PROPERTY = createAsyncThunk(
  "addProperty",
  async (formData) => {
    const result = await axios.post(`${baseUrl}/createProperty`, formData, {
      // receive two    parameter endpoint url ,form data
    });
    console.log("results", result.data);
    return result.data;
  }
);
export const GET_PROPERTY = createAsyncThunk("getProperty", async () => {
  const result = await fetch3(`${baseUrl}/api/getAllProperties`, "get");
  console.log("result", result);
  return result;
});
export const GET_PROPERTY_BY_ID = createAsyncThunk(
  "getPropertyById",
  async (id) => {
    const result = await fetch5(`${baseUrl}/api/getPropertyByID/${id}`, "get");
    console.log("result", result);
    return result;
  }
);
export const GET_BLOG_BY_ID = createAsyncThunk(
  `${baseUrl}getBlogById`,
  async (id) => {
    const result = await fetch3(`/blog/show/${id}`, "get");
    console.log("result", result);
    return result;
  }
);

export const GET_RENT_PROPERTY = createAsyncThunk(
  "getRentProperty",
  async () => {
    const result = await fetch3(`${baseUrl}/api/admin/property/rent`, "get");
    console.log("result", result);
    return result;
  }
);

export const GET_SALE_PROPERTY = createAsyncThunk(
  "getSaleProperty",
  async () => {
    const result = await fetch3(`${baseUrl}/api/admin/property/sale`, "get");
    console.log("result", result);
    return result;
  }
);

export const GET_SALE_LOGGED_USER_PROPERTY = createAsyncThunk(
  "getSaleLoggedUserProperties",
  async () => {
    const result = await fetch3(
      `${baseUrl}/api/sale/loggedUserProperties`,
      "get"
    );
    console.log("result", result);
    return result;
  }
);

export const GET_RENT_LOGGED_USER_PROPERTY = createAsyncThunk(
  "getRentLoggedUserProperties",
  async () => {
    const result = await fetch3(
      `${baseUrl}/api/rent/loggedUserProperties`,
      "get"
    );
    console.log("result", result);
    return result;
  }
);

export const DELETE_SALE_PROPERTY = createAsyncThunk(
  "deleteSaleProperty",
  async (id) => {
    const result = await fetch3(`${baseUrl}/removeProperty/${id}`, "delete");
    console.log("Results", result);
    return result;
  }
);
export const DELETE_RENT_PROPERTY = createAsyncThunk(
  "deleteRentProperty",
  async (id) => {
    const result = await fetch3(`${baseUrl}/removeProperty/${id}`, "delete");
    console.log("Results", result);
    return result;
  }
);

export const UPDATE_PROPERTY = createAsyncThunk(
  "updateProperty",
  async (body) => {
    console.log("Body", body);
    // const result = await axios.put(
    //   `${baseUrl}/updateProperty/${body._id}`,
    //   body,
    //   {
    //     // params: { _id: _id },
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   }
    // );
    // fetch2(`/updateProperty/${body._id}`, body, "put");
    // console.log("result", result);
    // return result;
  }
);

export const propertyReducer = createSlice({
  name: "property",
  initialState,
  reducers: {
    storeRentProperty: (state, { payload }) => {
      console.log("payload", payload);
      console.log("Rent property in redux", payload.data);
      state.RentProperty = payload.data;
    },
    deleteFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      console.log("reducer error", payload.error);
    },
  },
  extraReducers: {
    [ADD_PROPERTY.fulfilled]: (state, action) => {
      console.log("Action", action);
      state.loading = false;
      if (action.payload.message) {
        state.property.push(action.payload.data);
        state.message = action.payload.message;
      }
      console.log("Messages", state.message);
      console.log("Property", state.property);
    },
    [ADD_PROPERTY.pending]: (state, action) => {
      state.loading = true;
    },
    [GET_PROPERTY.pending]: (state, action) => {
      state.loading = true;
    },
    [GET_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("message of get-property", payload);

      state.AllProperties = payload.data;
      state.loading = false;

      return state;
    },

    [GET_RENT_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("rent wali", payload.data);
      state.RentProperty = payload.data;
      return state;
    },

    [GET_SALE_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("sale wali", payload.data);
      state.SaleProperty = payload.data;
      return state;
    },

    [GET_PROPERTY_BY_ID.fulfilled]: (state, { payload }) => {
      state.property = payload?.data;
      return state;
    },
    [GET_BLOG_BY_ID.fulfilled]: (state, { payload }) => {
      console.log("paljadf", payload);
      console.log("blog wali", payload?.data);
      state.blog = payload?.data;
      return state;
    },

    [GET_SALE_LOGGED_USER_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("get log user sale wali", payload.data);
      state.SaleProperty.push(payload.data);
      return state;
    },

    [GET_RENT_LOGGED_USER_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("get log user rent wali", payload.data);
      state.RentProperty.push(payload.data);
      return state;
    },

    [DELETE_SALE_PROPERTY.fulfilled]: (
      state,
      { payload: { message, data } }
    ) => {
      if (message === "success") {
        const removeTodo = state.SaleProperty.filter((item) => {
          return item._id !== data._id;
        });
        return removeTodo;
      }
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
