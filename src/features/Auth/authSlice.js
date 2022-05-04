import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import authService from "services/authService";

const refreshToken = createAction("auth/refreshToken");
const logout = createAction("auth/logout");
const login = createAction("auth/login");

export const fetchLogin = createAsyncThunk(
  login.type,
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.login({ email, password });
      data.message = "Đăng nhập thành công";
      return data;
    } catch (error) {
      const { message } = error?.response.data;
      const { status } = error?.response;
      if (message === "Email or password is incorrect") {
        const message = "Tài khoản hoặc mật khẩu không đúng";
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
      const { data } = await authService.refreshToken(token);
      return data;
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
      await authService.logout(refreshToken);
      const message = "Đăng xuất thành công";
      return message;
    } catch (error) {
      const { message } = error.response.data;
      const { status } = error.response;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  role: null,
  userId: null,

  loading: false,
  error: null,
  message: null,
  countError: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      showToast("success", action.payload.message, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      state.countError += 1;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(getRefreshToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      showToast("success", action.payload.message, toastPosition.bottomRight);
    });
    builder.addCase(getRefreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      showToast("error", action.payload.message, toastPosition.topRight);
    });

    builder.addCase(getLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.message = null;
      state.error = false;
      state.isAuthenticated = false;
      state.role = null;
      showToast("success", action.payload, toastPosition.bottomRight);
    });
    builder.addCase(getLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuthenticated = false;
      state.message = action.payload;
    });
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
