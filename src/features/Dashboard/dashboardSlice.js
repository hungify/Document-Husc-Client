import dashboardService from "services/dashboardService";

const { createSlice, createAsyncThunk, createAction } = require("@reduxjs/toolkit");

const analytics = createAction("dashboard/fetch/analytics");
export const fetchAnalytics = createAsyncThunk(analytics.type, async (payload, thunkAPI) => {
  const { data } = await dashboardService.fetchAnalytics();
  return data;
});

const initialState = {
  error: null,
  loading: false,
  message: null,

  analytics: [],
};
const analyticsSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      state.loading = false;
      state.analytics = action.payload;
    });
    builder.addCase(fetchAnalytics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { resetDashboard } = analyticsSlice.actions;
export default analyticsSlice.reducer;
