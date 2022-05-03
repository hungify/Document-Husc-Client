import documentsService from "services/documentsService";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";

const fetch = createAction("documentDetails/fetch");
export const fetchDocumentDetails = createAsyncThunk(fetch.type, async (query, thunkAPI) => {
  try {
    const { data } = await documentsService.getDocumentDetail(query);
    return { data, key: query.key };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const updateRead = createAction("documentDetails/update/read");
export const updateReadDocument = createAsyncThunk(updateRead.type, async (query, thunkAPI) => {
  try {
    const userId = "626bdbf7f302b3be8e1d4ffe";
    const { data } = await documentsService.updateReadDocument({ ...query, userId });
    return data;
  } catch (error) {
    const { message, status } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
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
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchDocumentDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateReadDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateReadDocument.fulfilled, (state, action) => {
      showToast("success", "Xử lý văn bản thành công", toastPosition.bottomRight);
    });
    builder.addCase(updateReadDocument.rejected, (state, action) => {
      state.error = true;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default documentDetailsSlice.reducer;
