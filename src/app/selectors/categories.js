import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getCategoriesTotal = (state) => state.categories.total;
export const getCategoriesTree = (state) => state.categories.categories;
export const getCategoriesTreeConfig = createSelector(getCategoriesTree, (categories) => {
  return categories.map((item) => _.omit(item, "key"));
});
