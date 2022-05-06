import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import documentsService from "services/documentsService";

const fetch = createAction("documentDetails/fetch");
export const fetchDocumentDetails = createAsyncThunk(fetch.type, async (query, thunkAPI) => {
  try {
    const { data, myReadDate, publisherId, isPublic } = await documentsService.getDocumentDetail(
      query
    );
    return { data, key: query.key, myReadDate, publisherId, isPublic };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  myReadDate: null,
  publisherId: null,
  isPublic: false,
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
      state.publisherId = action.payload.publisherId;
      state.isPublic = action.payload.isPublic;
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchDocumentDetails.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default documentDetailsSlice.reducer;
