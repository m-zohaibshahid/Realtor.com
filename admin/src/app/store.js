import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import propertyReducer from "../reducers/propertyReducer";
// import forgotPasswordReducer from "../reducers/forgotPasswordReducer";
import filterReducer from "../reducers/filterReducer";
// import newsLetterReducer from "../reducers/newLetterReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    property: propertyReducer,
    // forgotPassword: forgotPasswordReducer,
    filter: filterReducer,
    // newsLetter: newsLetterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
