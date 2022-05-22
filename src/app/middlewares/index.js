import searchAndFilterMiddleware from "app/middlewares/searchAndFilter";
import resetMiddleware from "app/middlewares/reset";
import logger from "redux-logger";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
const middlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .prepend(searchAndFilterMiddleware, resetMiddleware)
    .concat(logger);

export default middlewares;
