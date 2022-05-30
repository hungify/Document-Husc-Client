import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import authService from "services/authService";
const refreshToken = createAction("auth/refreshToken");
const logout = createAction("auth/logout");
const login = createAction("auth/login");

export const fetchLogin = createAsyncThunk(login.type, async (values, thunkAPI) => {
  try {
    const { email, password } = values;
    const { data } = await authService.login({ email, password });
    data.message = "Đăng nhập thành công";
    return data;
  } catch (error) {
    const { message } = error?.response.data;
    if (message === "Email or password is incorrect") {
      const message = "Tài khoản hoặc mật khẩu không đúng";
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue(message);
  }
});

const register = createAction("register");
export const fetchRegister = createAsyncThunk(register.type, async (values, thunkAPI) => {
  const { username, email, password, department, navigate, role } = values;
  try {
    const { data } = await authService.register({ username, email, password, department, role });
    data.message = "Đăng ký thành công !\n Vui lòng đăng nhập";
    navigate("/login");
    return data;
  } catch (error) {
    const { message } = error.response.data;
    const { status } = error.response;
    if (status === 409) {
      if (message === `User with email "${email}" already exists`) {
        const message = `Tài khoản với email ${email} này đã tồn tại`;
        return thunkAPI.rejectWithValue(message);
      } else if (message === `User with username "${username}" already exists`) {
        const message = `Tài khoản với tên ${username} này đã tồn tại`;
        return thunkAPI.rejectWithValue(message);
      }
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchRefreshToken = createAsyncThunk(
  refreshToken.type,
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await authService.refreshToken(token);
      return data;
    } catch (error) {
      const { message } = error.response.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchLogout = createAsyncThunk(logout.type, async (data, { rejectWithValue }) => {
  const { refreshToken } = data;
  try {
    await authService.logout(refreshToken);
    const message = "Đăng xuất thành công";
    return message;
  } catch (error) {
    const { message } = error.response.data;
    return rejectWithValue(message);
  }
});

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  role: null,
  userId: null,

  loading: false,
  success: false,
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
      state.countError += 1;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchRegister.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", action.payload.message, toastPosition.bottomRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.countError += 1;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchRefreshToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      showToast("success", "Refresh token success", toastPosition.bottomRight);
    });
    builder.addCase(fetchRefreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      showToast("error", action.payload.message, toastPosition.topRight);
    });

    builder.addCase(fetchLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.message = null;
      state.error = false;
      state.isAuthenticated = false;
      state.role = null;
      // showToast("success", action.payload, toastPosition.bottomRight);
    });
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
