import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import sentService from "services/sentService";
const sent = createAction("sent/fetch/sentDocuments");
export const fetchSentDocuments = createAsyncThunk(sent.type, async (query, thunkAPI) => {
  try {
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const data = await sentService.getSentDocuments({ page, pageSize });
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

export const initialState = {
  loading: false,
  error: null,
  message: null,

  sentDocuments: [],
  total: 0,
};

const sentDocumentsSlice = createSlice({
  name: "sent",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSentDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSentDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.sentDocuments = action.payload.data || [];
      state.total = action.payload.total || 0;
    });
    builder.addCase(fetchSentDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default sentDocumentsSlice.reducer;
