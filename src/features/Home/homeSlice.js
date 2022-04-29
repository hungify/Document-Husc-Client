import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentsService from "services/documentsService";

const documents = createAction("documents/getDocuments");

export const fetchDocuments = createAsyncThunk(documents.type, async (arg, thunkAPI) => {
  try {
    const data = await documentsService.getDocuments();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isFetching: false,
  message: "",
  isSuccess: false,
  total: 0,
  totalMatch: 0,

  documents: [
    // {
    //   documentNumber: null,
    //   title: "",
    //   content: "",
    //   summary: "",
    //   agency: "",
    //   typesOfDocument: null,
    //   category: "",
    //   signer: "",
    //   issueDate: "",
    //   urgentLevel: "",
    //   files: [
    //     {
    //       originName: "",
    //       location: "",
    //     },
    //   ],
    //   relatedDocuments: [],
    //   isPublic: true,
    //   isArchived: false,
    //   participants: [],
    // },
  ],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.documents = action.payload.documents;
      state.total = action.payload.total;
      state.totalMatch = action.payload.totalMatch;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default homeSlice.reducer;
