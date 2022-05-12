import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import departmentService from "services/departments";

const fetch = createAction("config/departments/fetch");
export const fetchDepartments = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await departmentService.fetchDepartments();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const create = createAction("config/departments/create");
export const fetchCreateDepartment = createAsyncThunk(create.type, async (label, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    await departmentService.createDepartment(label);
    dispatch(fetchDepartments());
    const message = "Thêm mới phong ban thành công";
    return message;
  } catch (error) {
    const { message } = error.response.data;
    const { status } = error.response;
    if (status === 409 && message === `Department with "${label}" already exists`) {
      const message = `Phòng ban "${label}" này đã tồn tại`;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue(message);
  }
});

const update = createAction("config/departments/update");
export const fetchUpdateDepartment = createAsyncThunk(update.type, async (values, thunkAPI) => {
  const { departmentId, label } = values;
  try {
    const { dispatch } = thunkAPI;
    await departmentService.updateDepartment(label, departmentId);
    dispatch(fetchDepartments());
    const message = "Cập nhật phong ban thành công";
    return message;
  } catch (error) {
    const { message } = error.response.data;
    const { status } = error.response;
    if (status === 409 && message === `Department with "${label}" already exists`) {
      const message = `Phòng ban "${label}" này đã tồn tại`;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  success: null,
  total: 0,
  departments: [],
};
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.departments = action.payload.data;
      state.total = action.payload.total;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchCreateDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchCreateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchCreateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      showToast("success", action.payload, toastPosition.bottomRight);
    });

    builder.addCase(fetchUpdateDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchUpdateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchUpdateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      showToast("success", action.payload, toastPosition.bottomRight);
    });
  },
});

export default departmentSlice.reducer;
