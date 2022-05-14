import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import archivesService from "services/archivesService";

const archive = createAction("archives/fetch/archive");
export const fetchArchivesDocuments = createAsyncThunk(archive.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await archivesService.fetchArchivesDocuments();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const restore = createAction("archives/fetch/restore");
export const fetchRestoreDocument = createAsyncThunk(restore.type, async (documentId, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    await archivesService.fetchRestoreDocument(documentId);
    const message = "Khôi phục văn bản thành công";
    dispatch(fetchArchivesDocuments());
    return message;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  success: null,

  archives: [],

  total: 0,
};

const archiveSlice = createSlice({
  name: "archives",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArchivesDocuments.pending, (state, action) => {
      state.loading = true;
      state.total = 0;
    });
    builder.addCase(fetchArchivesDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.archives = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchArchivesDocuments.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchRestoreDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRestoreDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", action.payload, toastPosition.bottomRight);
    });
    builder.addCase(fetchRestoreDocument.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default archiveSlice.reducer;
