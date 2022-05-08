import searchAndFilterMiddleware from "app/middlewares/searchAndFilter";
import configMiddleware from "app/middlewares/config";
import logger from "redux-logger";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
const middlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .prepend(searchAndFilterMiddleware, configMiddleware)
    .concat(logger);

export default middlewares;
