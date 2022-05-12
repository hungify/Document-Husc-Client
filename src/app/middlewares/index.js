import searchAndFilterMiddleware from "app/middlewares/searchAndFilter";
import logger from "redux-logger";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
const middlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .prepend(searchAndFilterMiddleware)
    .concat(logger);

export default middlewares;
