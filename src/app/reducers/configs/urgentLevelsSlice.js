import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import urgentLevelsService from "services/urgentLevelsService";

const fetch = createAction("config/urgentLevels/fetch");
export const fetchUrgentLevels = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await urgentLevelsService.fetchUrgentLevels();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  total: 0,
  urgentLevels: [],
};

const urgentLevelsSlice = createSlice({
  name: "urgentLevels",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUrgentLevels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUrgentLevels.fulfilled, (state, action) => {
      state.loading = false;
      state.urgentLevels = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchUrgentLevels.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default urgentLevelsSlice.reducer;
