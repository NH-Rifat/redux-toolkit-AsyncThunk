const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");
const videoSlice = require("../features/video/videoSlice");

const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    videos: videoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
