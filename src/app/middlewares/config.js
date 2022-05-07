import {
  fetchCreateDepartment,
  fetchDepartments,
  fetchEditDepartment,
} from "app/reducers/configs/departmentsSlice";

const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");

const configMiddleware = createListenerMiddleware();

configMiddleware.startListening({
  matcher: isAnyOf(fetchCreateDepartment.fulfilled, fetchEditDepartment.fulfilled),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    dispatch(fetchDepartments());
  },
});

export default configMiddleware.middleware;
