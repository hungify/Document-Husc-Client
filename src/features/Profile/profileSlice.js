import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import userService from "services/userService";

const profile = createAction("profile/fetch/profile");
export const fetchProfile = createAsyncThunk(profile.type, async (args, thunkAPI) => {
  try {
    const { data } = await userService.fetchProfile();
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  username: "",
  email: "",
  avatar: "",
  department: "",

  loading: false,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.department = action.payload.department;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default profileSlice.reducer;
