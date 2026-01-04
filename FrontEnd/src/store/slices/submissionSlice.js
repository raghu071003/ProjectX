import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const submitCode = createAsyncThunk(
  "submission/submit",
  async (payload) => {
    const res = await api.post("/submissions", payload);
    return res.data;
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    result: null,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      });
  }
});

export default submissionSlice.reducer;
