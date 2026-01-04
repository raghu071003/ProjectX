import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const fetchSkills = createAsyncThunk(
  "skills/fetch",
  async () => {
    const res = await api.get("/skills/my");
    return res.data.skills;
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    list: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  }
});

export default skillsSlice.reducer;
