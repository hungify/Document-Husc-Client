import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  pageSize: 10,
  sort: "createAt",

  search: {
    searchBy: null,
    searchValue: null,
  },

  dateRange: {
    orderBy: null,
    start: null,
    end: null,
  },

  filtersBy: {
    typesOfDocument: null,
    agency: null,
    category: null,
  },
};

const searchGroupSlice = createSlice({
  name: "searchGroup",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSortBy: (state, action) => {
      state.sort = action.payload;
    },
    setSearchForm: (state, action) => {
      state.search = {
        searchBy: action.payload.searchBy,
        searchValue: action.payload.searchText,
      };
      state.dateRange = {
        orderBy: action.payload.orderBy,
        start: action.payload.start,
        end: action.payload.end,
      };
    },
    setFiltersBy: (state, action) => {
      for (const key in action.payload) {
        // check also if property is not inherited from prototype
        if (action.payload.hasOwnProperty(key)) {
          const value = action.payload[key];
          state.filtersBy[key] = value;
        }
      }
    },
  },
});

export const { setSearchForm, setFiltersBy, setSortBy, setPage, setPageSize } =
  searchGroupSlice.actions;

export default searchGroupSlice.reducer;
