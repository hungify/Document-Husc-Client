import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import configService from "services/configService";

const typesOfDocuments = createAction("config/typesOfDocuments");
export const fetchConfigApp = createAsyncThunk(typesOfDocuments.type, async (args, thunkAPI) => {
  try {
    const [typesOfDocuments, categories, agencies, urgentLevels, departments] = await Promise.all([
      configService.fetchTypesOfDocuments(),
      configService.fetchCategories(),
      configService.fetchAgencies(),
      configService.fetchUrgentLevels(),
      configService.fetchDepartments(),
    ]);
    const data = {
      typesOfDocuments: typesOfDocuments.data,
      categories: categories.data,
      agencies: agencies.data,
      urgentLevels: urgentLevels.data,
      departments: departments.data
    };
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  error: null,
  typesOfDocuments: [],
  categories: [],
  agencies: [],
  urgentLevels: [],
  departments: [],
};

const configSlice = createSlice({
  name: "config",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchConfigApp.fulfilled, (state, action) => {
      state.loading = false;
      state.typesOfDocuments = action.payload.typesOfDocuments;
      state.categories = action.payload.categories;
      state.agencies = action.payload.agencies;
      state.urgentLevels = action.payload.urgentLevels;
      state.departments = action.payload.departments;
    });
    builder.addCase(fetchConfigApp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConfigApp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });

  },
});

export default configSlice.reducer;
