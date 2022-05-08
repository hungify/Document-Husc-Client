import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentsService from "services/documentsService";

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

const initialState = {
  loading: false,
  message: "",
  error: false,
  success: false,
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

const homeSlice = createSlice({
  name: "home",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state, action) => {
      state.loading = true;
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
  },
});

export default homeSlice.reducer;
