import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import skillsReducer from "./slices/skillsSlice.js";
import recommendationReducer from "./slices/recommendationSlice.js";
import submissionReducer from "./slices/submissionSlice.js";
import mockReducer from "./slices/mockSlice.js";
import problemReducer from "./slices/problemSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    recommendation: recommendationReducer,
    submission: submissionReducer,
    mock:mockReducer,
    problem:problemReducer
  }
});
