import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const submitCode = createAsyncThunk(
  "submission/submit",
  async (payload) => {
    const res = await api.post("/submissions", payload);
    return res.data;
  }
);

export const testCode = createAsyncThunk(
  "submission/test",
  async (payload) => {
    const res = await api.post("/submissions/run", payload);
    return res.data;
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    result: null,
    loading: false,
    runResult: null,
    runLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
        state.runResult = null; // Clear run result on submit
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.loading = false;
        state.result = { verdict: "Error", execution: { stdout: "", stderr: "Submission failed. Please try again or check console logs." } };
      })
      .addCase(testCode.pending, (state) => {
        state.runLoading = true;
      })
      .addCase(testCode.fulfilled, (state, action) => {
        state.runResult = action.payload;
        state.runLoading = false;
        state.result = null; // Clear submit result on run
      })
      .addCase(testCode.rejected, (state, action) => {
        state.runLoading = false;
        state.runResult = { verdict: "Error", execution: { stdout: "", stderr: "Test run failed. Please try again or check console logs." } };
      });
  }
});

export default submissionSlice.reducer;
