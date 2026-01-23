import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const fetchRecommendation = createAsyncThunk(
  "recommendation/fetch",
  async () => {
    const res = await api.get("/recommendations/next-ai");
    return res.data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    data: null,
    loadingRecommendation: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendation.pending, (state) => {
        state.loadingRecommendation = true;
      })
      .addCase(fetchRecommendation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingRecommendation = false;
      });
  }
});

export default recommendationSlice.reducer;
