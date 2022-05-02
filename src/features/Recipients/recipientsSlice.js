import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import recipientsService from "services/recipientsService";

const recipients = createAction("recipients/fetchRecipients");
export const fetchRecipients = createAsyncThunk(recipients.type, async (args, thunkAPI) => {
  try {
    const { data, message } = await recipientsService.getRecipients();
    return { data, message };
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  error: null,
  success: null,
  message: null,
  users: [],
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
      state.users = action.payload.data;
    });
    builder.addCase(fetchRecipients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
    });
  },
});

export default recipientsSlice.reducer;
