import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "config/toast";
import authService from "services/authService";

const refreshToken = createAction("auth/refreshToken");
const logout = createAction("auth/logout");
const login = createAction("auth/login");

export const getLogin = createAsyncThunk(
  login.type,
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.login({ username, password });
      return data;
    } catch (error) {
      const { message, status } = error?.response.data;
      if (message === "Unauthorized" && status === 401) {
        const message = "Invalid email or password";
        return rejectWithValue(message);
      } else if (status === 500) {
        return rejectWithValue(message);
      }
      return rejectWithValue(message);
    }
  }
);

export const getRefreshToken = createAsyncThunk(
  refreshToken.type,
  async (token, { rejectWithValue }) => {
    try {
      const data = await authService.refreshToken(token);
      return data.elements;
    } catch (error) {
      const { status, message } = error.response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getLogout = createAsyncThunk(
  logout.type,
  async (refreshToken, { rejectWithValue }) => {
    try {
      const data = await authService.logout(refreshToken);
      return data.message;
    } catch (error) {
      const { message, status } = error.response.data;
      if (status === 401) {
        return rejectWithValue(message);
      }
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  isFetching: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: false,
  message: null,
  countError: 0,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      showToast("success", action.payload.message, toastPosition.topRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(getLogin.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload;
      state.countError += 1;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(getRefreshToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      showToast("success", "Token refreshed", toastPosition.bottomRight);
    });
    builder.addCase(getRefreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      if (action.payload.message === "jwt expired" && action.payload.status === 500) {
        debugger;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        showToast("error", "Session expired, please login again", toastPosition.bottomRight);
      }
    });

    builder.addCase(getLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.message = null;
      state.isError = false;
      state.isAuthenticated = false;
      state.role = null;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(getLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.message = action.payload;
    });
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
