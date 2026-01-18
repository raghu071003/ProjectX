import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apis/axios";

export const fetchSkills = createAsyncThunk("skills/fetch", async () => {
  const res = await api.get("/skills/my");
  return res.data.skills;
});
export const fetchSkillTrend = createAsyncThunk(
  "skills/trend",
  async (skillKey) => {
    const res = await api.get(`/skills/trend/${skillKey}`);
    return {
      skillKey,
      trend: res.data.trend,
    };
  },
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    list: [],
    trends: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchSkillTrend.fulfilled, (state, action) => {
        state.trends[action.payload.skillKey] = action.payload.trend;
      });
  },
});

export default skillsSlice.reducer;
