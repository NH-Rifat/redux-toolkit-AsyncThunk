const store = require("./App/store");
const {
  fetchVideo,
  fetchVideosByTags,
} = require("./features/video/videoSlice");

let loaded = false;
store.subscribe(() => {
  // console.log("Store changed!", store.getState());
  const videoTags = store.getState().videos.tags;
  if (loaded === false && videoTags.length > 0) {
    loaded = true;
    store.dispatch(fetchVideosByTags(videoTags));
  }
  // console.log("Store changed!", store.getState());
});

// dispatch actions
store.dispatch(fetchVideo());
