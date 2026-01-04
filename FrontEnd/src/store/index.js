import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import skillsReducer from "./slices/skillsSlice.js";
import recommendationReducer from "./slices/recommendationSlice.js";
import submissionReducer from "./slices/submissionSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    recommendation: recommendationReducer,
    submission: submissionReducer
  }
});
