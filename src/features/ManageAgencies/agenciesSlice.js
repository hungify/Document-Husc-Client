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

const create = createAction("config/agencies/create");
export const fetchCreateAgencies = createAsyncThunk(create.type, async (label, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    await agenciesService.fetchCreateAgencies(label);

    dispatch(fetchAgencies());
    const message = "Thêm mới cơ quan ban hành thành công";
    return message;
  } catch (error) {
    const { message } = error.response.data;
    if (message === `Agency with label ${label} already exists`) {
      const message = `Cơ quan ban hành ${label} đã tồn tại`;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue(message);
  }
});

const update = createAction("config/agencies/update");
export const fetchUpdateAgencies = createAsyncThunk(update.type, async (values, thunkAPI) => {
  const { agencyId, label } = values;
  try {
    const { dispatch } = thunkAPI;
    await agenciesService.fetchUpdateAgencies({ agencyId, label });
    dispatch(fetchAgencies());
    const message = "Cập nhật thông tin cơ quan ban hành thành công";
    return message;
  } catch (error) {
    if (message === `Agency with label ${label} already exists`) {
      const message = `Cơ quan ban hành ${label} đã tồn tại`;
      return thunkAPI.rejectWithValue(message);
    }
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

    builder.addCase(fetchCreateAgencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateAgencies.fulfilled, (state, action) => {
      state.loading = false;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchCreateAgencies.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchUpdateAgencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateAgencies.fulfilled, (state, action) => {
      state.loading = false;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchUpdateAgencies.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default agenciesSlice.reducer;
