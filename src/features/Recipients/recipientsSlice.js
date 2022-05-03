import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import recipientsService from "services/recipientsService";

const recipients = createAction("recipients/fetch/recipients");
export const fetchRecipients = createAsyncThunk(recipients.type, async (args, thunkAPI) => {
  try {
    const { data } = await recipientsService.getRecipients();
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const excluded = createAction("recipients/fetch/excluded");
export const fetchExcludedRecipients = createAsyncThunk(
  excluded.type,
  async (documentId, thunkAPI) => {
    try {
      const { data } = await recipientsService.getExcludedRecipients(documentId);
      const participants = data.participants;
      const publisherId = data.publisher._id;
      const excludedIds = participants.map((user) => user.receiver._id);
      excludedIds.push(publisherId);
      
      return excludedIds;
    } catch (error) {
      const { message } = error.response.data;
      thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: null,
  message: null,
  users: [],
  excludedUsers: [],
};

const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRecipients.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(fetchRecipients.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = action.payload.message;
      state.users = action.payload;
    });
    builder.addCase(fetchRecipients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
    });
    builder.addCase(fetchExcludedRecipients.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(fetchExcludedRecipients.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.excludedUsers = action.payload;
    });
    builder.addCase(fetchExcludedRecipients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
    });
  },
});

export default recipientsSlice.reducer;
