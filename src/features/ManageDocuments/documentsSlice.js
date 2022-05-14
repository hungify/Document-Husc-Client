import documentsService from "services/documentsService";
import showToast, { toastPosition } from "configs/toast";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const getAll = createAction("documents/fetch/documents");
export const fetchDocuments = createAsyncThunk(getAll.type, async (arg, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const { searchGroup } = getState();

    const data = await documentsService.fetchDocuments(searchGroup);
    return data;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const related = createAction("documents/fetch/relatedDocuments");
export const fetchDocumentByIds = createAsyncThunk(related.type, async (ids, thunkAPI) => {
  try {
    const { data } = await documentsService.fetchDocumentsByIds(ids);
    return data;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const getFilterDateRange = createAction("documents/fetch/filterDateRange");
export const fetchFilterDateRange = createAsyncThunk(
  getFilterDateRange.type,
  async (filterKeys, thunkAPI) => {
    try {
      const data = await documentsService.fetchDocumentsByFilter(filterKeys);
      return data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const create = createAction("documents/fetch/issue");
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
const update = createAction("documents/fetch/update");
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

const revoke = createAction("documents/fetch/revoke");
export const fetchRevokeDocument = createAsyncThunk(revoke.type, async (documentId, thunkAPI) => {
  try {
    const { dispatch } = thunkAPI;
    await documentsService.fetchRevokeDocument(documentId);
    const message = "Thu hồi văn bản thành công";
    dispatch(fetchDocuments());

    return message;
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
  archived: [],

  total: 0,
  totalMatch: 0,

  documents: [
    // {
    //   documentNumber: null,
    //   title: "",
    //   content: "",
    //   summary: "",
    //   agency: "",
    //   typesOfDocument: null,
    //   category: "",
    //   signer: "",
    //   issueDate: "",
    //   urgentLevel: "",
    //   files: [
    //     {
    //       originName: "",
    //       location: "",
    //     },
    //   ],
    //   relatedDocuments: [],
    //   isPublic: true,
    //   isArchived: false,
    //   participants: [],
    // },
  ],
  relatedDocuments: [],
};

const issueDocumentSlice = createSlice({
  name: "documents",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state, action) => {
      state.loading = true;
      state.archived = [];
      state.total = 0;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.documents = action.payload.data;
      state.total = action.payload.total;
      state.totalMatch = action.payload.totalMatch;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    builder.addCase(fetchDocumentByIds.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentByIds.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.relatedDocuments = action.payload;
    });
    builder.addCase(fetchDocumentByIds.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

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

    builder.addCase(fetchRevokeDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRevokeDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      showToast("success", action.payload, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(fetchRevokeDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default issueDocumentSlice.reducer;
