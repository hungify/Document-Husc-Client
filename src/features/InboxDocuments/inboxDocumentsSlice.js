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

const forward = createAction("inbox/forward");
export const forwardDocuments = createAsyncThunk(forward.type, async (query, thunkAPI) => {
  try {
    const { documentId, ids } = query;
    const receivers = ids.map((id) => {
      return {
        receiverId: id,
      };
    });
    const { message } = await inboxService.forwardDocuments( documentId, receivers);
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

  inboxDocuments: [],
};

const inboxDocumentsSlice = createSlice({
  name: "inbox",
  initialState: initialState,
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
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(forwardDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forwardDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", action.payload, toastPosition.topBottom);
    });
    builder.addCase(forwardDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});


export default inboxDocumentsSlice.reducer;
