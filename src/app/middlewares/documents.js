import { fetchDocuments } from "features/Home/homeSlice";

const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");
const {
  setFiltersBy,
  setSearchForm,
  setSortBy,
  setPageSize,
  setPage,
} = require("features/SearchGroup/searchGroupSlice");

const documentListenerMiddleware = createListenerMiddleware();

documentListenerMiddleware.startListening({
  matcher: isAnyOf(setFiltersBy, setSearchForm, setPage, setPageSize, setSortBy),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(fetchDocuments());

    // Run whatever additional side-effect-y logic you want here
    // // Can cancel other running instances
    // listenerApi.cancelActiveListeners();
    // // Run async logic
    // const data = await fetchData();
    // // Pause until action dispatched or state changed
    // if (await listenerApi.condition(matchSomeAction)) {
    //   // Use the listener API methods to dispatch, get state,
    //   // unsubscribe the listener, start child tasks, and more
    //   listenerApi.dispatch(todoAdded("Buy pet food"));
    //   // Spawn "child tasks" that can do more work and return results
    //   const task = listenerApi.fork(async (forkApi) => {
    //     // Can pause execution
    //     await forkApi.delay(5);
    //     // Complete the child by returning a value
    //     return 42;
    //   });
    //   const result = await task.result;
    //   // Unwrap the child result in the listener
    //   if (result.status === "ok") {
    //     // Logs the `42` result value that was returned
    //     console.log("Child succeeded: ", result.value);
    //   }
    // }
  },
});

export default documentListenerMiddleware;
