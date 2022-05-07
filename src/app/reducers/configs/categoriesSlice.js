import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import categoriesService from "services/categoriesService";

const fetch = createAction("config/categories/fetch");
export const fetchCategories = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await categoriesService.fetchCategories();
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
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default categoriesSlice.reducer;
