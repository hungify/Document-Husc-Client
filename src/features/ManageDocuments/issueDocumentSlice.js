import documentsService from "services/documentsService";
import showToast, { toastPosition } from "configs/toast";

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const create = createAction("issueDocument/issue");
export const fetchIssueDocumentOfficial = createAsyncThunk(
  create.type,
  async (formData, thunkAPI) => {
    try {
      const { data } = await documentsService.fetchCreateDocument(formData);
      const message = "Ban hành thành công";
      return { message, data };
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const update = createAction("issueDocument/update");
export const fetchUpdateDocument = createAsyncThunk(update.type, async (formValues, thunkAPI) => {
  try {
    const { formData, documentId } = formValues;
    const { data } = await documentsService.fetchUpdateDocument(documentId, formData);
    const message = "Cập nhật thành công";
    return { message, data };
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
    builder.addCase(fetchIssueDocumentOfficial.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(fetchIssueDocumentOfficial.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      showToast("success", action.payload.message, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(fetchIssueDocumentOfficial.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      showToast("error", action.payload, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });

    builder.addCase(fetchUpdateDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      showToast("success", action.payload.message, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(fetchUpdateDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default issueDocumentSlice.reducer;
