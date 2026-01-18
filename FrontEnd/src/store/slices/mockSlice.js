import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios.js";

export const startMock = createAsyncThunk(
  "mock/start",
  async (duration) => {
    const res = await api.post("/mock/start", { duration });
    return res.data;
  }
);

export const endMock = createAsyncThunk(
  "mock/end",
  async (sessionId) => {
    const res = await api.post(`/mock/${sessionId}/end`);
    return res.data;
  }
);

const mockSlice = createSlice({
  name: "mock",
  initialState: {
  session: null,
  summary: null,
  currentIndex: 0,
  locked: false
}
,
reducers: {
  nextProblem(state) {
    if (state.currentIndex < state.session.problems.length - 1) {
      state.currentIndex += 1;
    }
  },
  prevProblem(state) {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
    }
  },
  lockMock(state) {
    state.locked = true;
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(startMock.fulfilled, (state, action) => {
        state.session = action.payload;
      })
      .addCase(endMock.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  }
});
export const { nextProblem, prevProblem, lockMock } =
  mockSlice.actions;


export default mockSlice.reducer;
