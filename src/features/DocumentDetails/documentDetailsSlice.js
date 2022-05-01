import documentsService from "services/documentsService";
const { createSlice, createAsyncThunk, createAction } = require("@reduxjs/toolkit");

const documentDetail = createAction("documentDetails/getDocumentDetails");
export const fetchDocumentDetails = createAsyncThunk(
  documentDetail.type,
  async (documentId, thunkAPI) => {
    try {
      const { data } = await documentsService.getDocumentDetail(documentId);
      return data;
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
};

const documentDetailsSlice = createSlice({
  name: "documentDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentDetails.fulfilled, (state, action) => {
      state.property = action.payload.property;
      state.files = action.payload.files;
      state.relatedDocument = action.payload.relatedDocument;
      state.participants = action.payload.participants;
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
