import { listToTree } from "utils/tree";

export const getCategoriesConfig = (state) => state.categories.categories;
export const getCategoriesTreeConfig = (state) => {
  const { categories } = state.categories;
  const categoriesTree = listToTree(categories);

  return [
    {
      title: "Danh mục gốc",
      key: "root",
      children: categoriesTree || [],
    },
  ];
};
