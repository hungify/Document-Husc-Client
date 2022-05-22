import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import draftService from "services/draftService";

const draft = createAction("documents/fetch/draft");
export const fetchDraftDocument = createAsyncThunk(draft.type, async (args, thunkAPI) => {
  try {
    const { data, total } = await draftService.fetchDraftDocument();
    return { data, total };
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  success: null,

  draft: [],

  total: 0,
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    resetDraft: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDraftDocument.pending, (state, action) => {
      state.loading = true;
      state.total = 0;
    });
    builder.addCase(fetchDraftDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.draft = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchDraftDocument.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { resetDraft } = draftSlice.actions;
export default draftSlice.reducer;
