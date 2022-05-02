import documentsService from "services/documentsService";
const { createSlice, createAsyncThunk, createAction } = require("@reduxjs/toolkit");

const documentDetail = createAction("documentDetails/getDocumentDetails");
export const fetchDocumentDetails = createAsyncThunk(
  documentDetail.type,
  async (query, thunkAPI) => {
    try {
      const { data } = await documentsService.getDocumentDetail(query);
      return { data, key: query.key };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  property: {},
  files: [],
  relatedDocument: [],
  participants: [],
  analytics: {
    datasets: [],
  },
};

const documentDetailsSlice = createSlice({
  name: "documentDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.property = action.payload.key === "property" ? action.payload.data : {};
      state.files = action.payload.key === "files" ? action.payload.data : [];
      state.relatedDocuments = action.payload.key === "relatedDocuments" ? action.payload.data : [];
      state.participants = action.payload.key === "participants" ? action.payload.data : [];
      state.analytics.datasets = action.payload.key === "analytics" ? action.payload.data : {};
    });
    builder.addCase(fetchDocumentDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchDocumentDetails.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default documentDetailsSlice.reducer;
