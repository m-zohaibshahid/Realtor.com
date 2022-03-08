import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import filterReducer from "../reducers/filterReducer";
import forgotPasswordReducer from "../reducers/forgotPasswordReducer";
import propertyReducer from "../reducers/propertyReducer";
export const store = configureStore({
  reducer: {
    user: authReducer,
    property: propertyReducer,
    forgotPassword: forgotPasswordReducer,
    filter: filterReducer,
    // newsLetter: newsLetterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
