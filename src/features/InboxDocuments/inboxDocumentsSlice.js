import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import inboxService from "services/inboxService";

const inbox = createAction("inbox/fetch/inboxDocuments");
export const fetchInboxDocuments = createAsyncThunk(inbox.type, async (query, thunkAPI) => {
  try {
    const page = query.page;
    const pageSize = query.pageSize;
    const orderBy = query.orderBy;

    const data = await inboxService.getInboxDocuments({ page, pageSize, orderBy });
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const updateRead = createAction("inbox/read");
export const updateReadDocument = createAsyncThunk(updateRead.type, async (query, thunkAPI) => {
  try {
    const { documentId, readDate } = query;
    await inboxService.updateReadDocument(documentId, readDate);
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const forward = createAction("inbox/forward");
export const forwardDocuments = createAsyncThunk(forward.type, async (query, thunkAPI) => {
  try {
    const { documentId, ids } = query;
    const receivers = ids.map((id) => {
      return {
        receiverId: id,
        sendDate: new Date(),
      };
    });
    const { message } = await inboxService.forwardDocuments(documentId, receivers);
    return message;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: "",

  total: 0,
  inboxDocuments: [],
};

const inboxDocumentsSlice = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    resetInbox: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInboxDocuments.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(fetchInboxDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.inboxDocuments = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchInboxDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(updateReadDocument.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateReadDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", "Xử lý văn bản thành công", toastPosition.bottomRight);
    });
    builder.addCase(updateReadDocument.rejected, (state, action) => {
      state.error = true;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(forwardDocuments.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(forwardDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", "Chuyển tiếp văn bản thành công", toastPosition.topBottom);
    });
    builder.addCase(forwardDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { resetInbox } = inboxDocumentsSlice.actions;
export default inboxDocumentsSlice.reducer;
