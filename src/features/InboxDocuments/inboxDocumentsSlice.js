import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inboxService from "services/inboxService";

const inbox = createAction("inbox/fetchInboxDocuments");

export const fetchInboxDocuments = createAsyncThunk(inbox.type, async (arg, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      inbox: { page, pageSize, orderBy },
    } = getState();
    const userId = "626bdc02f302b3be8e1d5001";
    const data = await inboxService.getInbox({ userId, page, pageSize, orderBy });
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: "",

  page: 1,
  pageSize: 10,
  orderBy: "all",
  inboxDocuments: [],
};

const inboxDocumentsSlice = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInboxDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInboxDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.inboxDocuments = action.payload.data;
    });
    builder.addCase(fetchInboxDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });
  },
});

export const { setPage, setPageSize, setOrderBy } = inboxDocumentsSlice.actions;

export default inboxDocumentsSlice.reducer;
