import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import typeOfDocumentService from "services/typesOfDocument";

const fetch = createAction("config/typesOfDocuments/fetch");
export const fetchTypesOfDocuments = createAsyncThunk(fetch.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await typeOfDocumentService.fetchTypesOfDocuments();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  total: 0,
  typesOfDocuments: [],
};
const typesOfDocumentsSlice = createSlice({
  name: "typesOfDocuments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTypesOfDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTypesOfDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.typesOfDocuments = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchTypesOfDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export default typesOfDocumentsSlice.reducer;
