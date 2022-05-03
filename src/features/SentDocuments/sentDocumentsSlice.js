import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import sentService from "services/sentService";
const sent = createAction("sent/fetch/sentDocuments");
export const fetchSentDocuments = createAsyncThunk(sent.type, async (query, thunkAPI) => {
  try {
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const userId = "626bdadfdb0a4ecf6f4cf652";
    const { data } = await sentService.getSentDocuments({ userId, page, pageSize });
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

  page: 1,
  pageSize: 10,

  sentDocuments: [],
};

const sentDocumentsSlice = createSlice({
  name: "sent",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSentDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSentDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.sentDocuments = action.payload;
    });
    builder.addCase(fetchSentDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default sentDocumentsSlice.reducer;
