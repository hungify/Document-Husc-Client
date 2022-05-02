import documentsService from "services/documentsService";
import showToast, { toastPosition } from "configs/toast";

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const create = createAction("issueDocument/issue");
export const issueDocumentOfficial = createAsyncThunk(create.type, async (formData, thunkAPI) => {
  try {
    const data = await documentsService.issueDocument(formData);
    return data.message;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  success: null,
  message: null,
  modeSave: "official",
  documentDraft: null,
};

const issueDocumentSlice = createSlice({
  name: "issueDocument",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(issueDocumentOfficial.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(issueDocumentOfficial.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = action.payload;
      showToast("success", action.payload, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(issueDocumentOfficial.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
  },
});

export default issueDocumentSlice.reducer;
