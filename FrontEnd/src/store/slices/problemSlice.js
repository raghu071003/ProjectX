import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

// Async thunk to fetch a problem by its ID
export const fetchProblem = createAsyncThunk(
  "problem/fetch",
  async (problemId) => {
    const res = await api.get(`/problems/${problemId}`);
    // console.log("Fetched Problem Data:", res.data);
    return res.data; // your API returns { problem: {...} }
  }
);

export const fetchProblemsBySkill = createAsyncThunk(
  "problems/fetchBySkill",
  async (skillKey) => {
    const res = await api.get(`/problems/skill/${skillKey}`);
    return res.data; // your API returns an array of problems
  }
);
const problemSlice = createSlice({
  name: "problem",
  initialState: {
    current: null,
    problemsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProblem: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblem.fulfilled, (state, action) => {
        state.current = action.payload; // store the problem object
        state.loading = false;
      })
      .addCase(fetchProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProblemsBySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblemsBySkill.fulfilled, (state, action) => {
        state.problemsList = action.payload; // store the array of problems
        state.loading = false;
      })
      .addCase(fetchProblemsBySkill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
  },
});

export const { clearProblem } = problemSlice.actions;
export default problemSlice.reducer;
