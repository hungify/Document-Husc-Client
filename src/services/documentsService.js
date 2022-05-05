import { removeEmptyObjects } from "helpers";
import axiosInstance from "services/initRequest";

const documentsService = {
  getDocuments: (filterQuery) => {
    const url = "/documents";

    const { sort, page, pageSize, filtersBy, search, dateRange } = filterQuery;
    const filterParams = removeEmptyObjects(filtersBy);
    const searchParams = removeEmptyObjects(search);
    const dateRangeParam = removeEmptyObjects(dateRange);

    let searchParamsString = null;
    if (searchParams.searchValue) {
      if (searchParams.searchBy === "both") {
        searchParamsString = {
          q: searchParams.searchValue,
        };
      } else {
        searchParamsString = {
          [`${searchParams.searchBy}[regex]`]: searchParams.searchValue,
        };
      }
    }

    const query = {
      ...filterParams,
      ...searchParamsString,
      ...dateRangeParam,
      sort: `-${sort}`,
      page,
      limit: pageSize,
    };

    return axiosInstance.get(url, {
      params: query,
    });
  },
  getDocumentDetail: ({ slug, key }) => {
    const url = `/documents/${slug}?tab=${key}`;
    return axiosInstance.get(url);
  },
  getDocumentsByIds: (ids) => {
    const url = "/documents?ids=".concat(ids.join(","));
    return axiosInstance.get(url);
  },
  createDocument: (formData) => {
    const url = "/documents";
    return axiosInstance.post(url, formData);
  },
};

export default documentsService;
