import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import { TABS } from "constants/tabs";
import documentsService from "services/documentsService";

const fetch = createAction("documentDetails/fetch/key");
export const fetchDocumentDetailsByTab = createAsyncThunk(fetch.type, async (query, thunkAPI) => {
  try {
    const response = await documentsService.fetchDocumentDetailsByTab(query);
    const { data, myReadDate, publisherId, isPublic } = response;
    if (query.key === TABS.PROPERTY) {
      data.key = query.key;
    }
    return { data, key: query.key, myReadDate, publisherId, isPublic };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const fetchAll = createAction("documentDetails/fetch/All");
export const fetchDocumentDetails = createAsyncThunk(fetchAll.type, async (query, thunkAPI) => {
  try {
    const { data } = await documentsService.fetchDocumentDetails(query);
    return data;
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
  conversation: {
    conversationId: null,
    messages: [],
  },
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
  reducers: {
    resetDocumentDetail: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentDetailsByTab.fulfilled, (state, action) => {
      state.property = action.payload.key === TABS.PROPERTY ? action.payload.data : {};
      state.fileList = action.payload.key === TABS.FILES ? action.payload.data : [];
      state.relatedDocuments =
        action.payload.key === TABS.RELATED_DOCUMENTS ? action.payload.data : [];
      state.participants = action.payload.key === TABS.PARTICIPANTS ? action.payload.data : [];
      state.analytics = action.payload.key === TABS.ANALYTICS ? action.payload.data : {};
      state.conversation = action.payload.key === TABS.CHAT_ROOM ? action.payload.data : null;

      state.myReadDate = action.payload.myReadDate;
      state.publisherId = action.payload.publisherId;
      state.isPublic = action.payload.isPublic;
    });
    builder.addCase(fetchDocumentDetailsByTab.rejected, (state, action) => {
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchDocumentDetailsByTab.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchDocumentDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.property = action.payload.property;
      state.fileList = action.payload.fileList;
      state.relatedDocuments = action.payload.relatedDocuments;
      state.participants = action.payload.participants;
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.error = true;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { resetDocumentDetail } = documentDetailsSlice.actions;
export default documentDetailsSlice.reducer;
