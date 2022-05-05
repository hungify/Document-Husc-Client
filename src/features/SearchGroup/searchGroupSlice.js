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
      state.page = action.payload.page;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload.pageSize;
    },
    setSortBy: (state, action) => {
      state.sort = action.payload.sortBy;
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
      delete action.payload["triggerBy"]; // key need to trigger in middleware
      for (const key in action.payload) {
        // check also if property is not inherited from prototype
        if (action.payload.hasOwnProperty(key)) {
          const value = action.payload[key];
          state.filtersBy[key] = value;
        }
      }
    },
    resetSearchAndFilters: (state) => {
      state.search = {
        searchBy: null,
        searchValue: null,
      };
      state.dateRange = {
        orderBy: null,
        start: null,
        end: null,
      };
      state.filtersBy = {
        typesOfDocument: null,
        agency: null,
        category: null,
      };
      state.page = 1;
      state.pageSize = 10;
    },
  },
});

export const {
  setSearchForm,
  setFiltersBy,
  setSortBy,
  setPage,
  setPageSize,
  resetSearchAndFilters,
} = searchGroupSlice.actions;

export default searchGroupSlice.reducer;
