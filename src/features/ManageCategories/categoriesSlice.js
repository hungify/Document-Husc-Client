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

const create = createAction("config/categories/create");
export const fetchCreateCategory = createAsyncThunk(create.type, async (values, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    const { title, parentId } = values;
    await categoriesService.fetchCreateCategory({ title, parentId });
    dispatch(fetchCategories());
    const message = "Thêm mới chuyên mục thành công";
    return message;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const update = createAction("config/categories/update");
export const fetchUpdateCategory = createAsyncThunk(update.type, async (values, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    const { title, categoryId } = values;
    await categoriesService.fetchUpdateCategory({ title, categoryId });
    dispatch(fetchCategories());
    const message = "Cập nhật chuyên mục thành công";
    return message;
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

    builder.addCase(fetchCreateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      showToast("success", action.payload.message, toastPosition.bottomRight);
    });
    builder.addCase(fetchCreateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchUpdateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateCategory.fulfilled, (state, action) => {
      state.loading = false;
      showToast("success", action.payload.message, toastPosition.bottomRight);
    });
    builder.addCase(fetchUpdateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default categoriesSlice.reducer;
