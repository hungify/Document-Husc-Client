import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import typeOfDocumentsService from "services/typesOfDocumentsService";

const fetch = createAction("config/typesOfDocuments/fetch");
export const fetchTypesOfDocuments = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await typeOfDocumentsService.fetchTypesOfDocuments();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const create = createAction("config/typesOfDocuments/create");
export const fetchCreateTypesOfDocuments = createAsyncThunk(
  create.type,
  async (label, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      await typeOfDocumentsService.fetchCreateTypesOfDocuments(label);
      dispatch(fetchTypesOfDocuments());
      const message = "Thêm mới loại văn bản thành công";
      return message;
    } catch (error) {
      const { message } = error.response.data;
      if (message === `TypeOfDocument with label ${label} already exists`) {
        const message = `Loại văn bản ${label} đã tồn tại`;
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const update = createAction("config/typesOfDocuments/update");
export const fetchUpdateTypesOfDocuments = createAsyncThunk(
  update.type,
  async (values, thunkAPI) => {
    const { typeOfDocumentId, label } = values;
    try {
      const { dispatch } = thunkAPI;
      await typeOfDocumentsService.fetchUpdateTypesOfDocuments({ typeOfDocumentId, label });
      dispatch(fetchTypesOfDocuments());
      const message = "Cập nhật thông tin loại văn bản thành công";
      return message;
    } catch (error) {
      if (message === `TypeOfDocument with label ${label} already exists`) {
        const message = `Loại văn bản ${label} đã tồn tại`;
        return thunkAPI.rejectWithValue(message);
      }
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  total: 0,
  typesOfDocuments: [],
};

const typesOfDocumentsSlice = createSlice({
  name: "typesOfDocuments",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTypesOfDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTypesOfDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.typesOfDocuments = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchTypesOfDocuments.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchCreateTypesOfDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateTypesOfDocuments.fulfilled, (state, action) => {
      state.loading = false;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchCreateTypesOfDocuments.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchUpdateTypesOfDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateTypesOfDocuments.fulfilled, (state, action) => {
      state.loading = false;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchUpdateTypesOfDocuments.rejected, (state, action) => {
      state.loading = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default typesOfDocumentsSlice.reducer;
