import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import documentsService from "services/documentsService";

const fetch = createAction("documentDetails/fetch");
export const fetchDocumentDetails = createAsyncThunk(fetch.type, async (query, thunkAPI) => {
  try {
    const { data, myReadDate } = await documentsService.getDocumentDetail(query);
    return { data, key: query.key, myReadDate };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  myReadDate: null,
  property: {},
  files: [],
  relatedDocuments: [],
  participants: [],
  analytics: {
    read: {
      count: 0,
      users: [],
    },
    unread: {
      count: 0,
      users: [],
    },
  },
};

const documentDetailsSlice = createSlice({
  name: "documentDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.property = action.payload.key === "property" ? action.payload.data : {};
      state.files = action.payload.key === "files" ? action.payload.data : [];
      state.relatedDocuments = action.payload.key === "relatedDocuments" ? action.payload.data : [];
      state.participants = action.payload.key === "participants" ? action.payload.data : [];
      state.analytics = action.payload.key === "analytics" ? action.payload.data : {};
      state.myReadDate = action.payload.myReadDate;
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchDocumentDetails.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default documentDetailsSlice.reducer;
