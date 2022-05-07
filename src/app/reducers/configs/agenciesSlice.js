import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import agenciesService from "services/agenciesService";

const fetch = createAction("config/agencies/fetch");
export const fetchAgencies = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await agenciesService.fetchAgencies();
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
  agencies: [],
};

const agenciesSlice = createSlice({
  name: "agencies",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAgencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAgencies.fulfilled, (state, action) => {
      state.loading = false;
      state.agencies = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchAgencies.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default agenciesSlice.reducer;
