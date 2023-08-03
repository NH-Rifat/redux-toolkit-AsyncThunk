const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  singleVideo: {},
  loading: false,
  error: "",
  tags: [],
  relatedVideos: [],
};

// create async thunk
const fetchVideo = createAsyncThunk("video/fetchSingleVideo", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const video = await response.json();
  return video;
});

// create async thunk for tags where tags are an array of tags and each tag is a query parameter with the key tags_like and the value is the tag name like javascript and react and redux etc like
const fetchVideosByTags = createAsyncThunk(
  "video/fetchRelatedVideosByTags",
  async (tags) => {
    const response = await fetch(
      `http://localhost:9000/videos?tags_like=${tags.join("&")}`
    );
    const videos = await response.json();
    // sort the videos according to the views
    videos.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    return videos;
  }
);

// create slice for video
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  // extra reducers
  extraReducers: (builder) => {
    // add case for fetchVideo and fetchVideosByTags
    builder
      .addCase(fetchVideo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.singleVideo = action.payload;
        state.tags = action.payload.tags;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVideosByTags.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchVideosByTags.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(fetchVideosByTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
module.exports.fetchVideosByTags = fetchVideosByTags;
