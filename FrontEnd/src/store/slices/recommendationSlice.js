import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const fetchRecommendation = createAsyncThunk(
  "recommendation/fetch",
  async () => {
    const res = await api.get("/recommendations/next");
    return res.data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    data: null,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  }
});

export default recommendationSlice.reducer;
