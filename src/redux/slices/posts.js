import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchOnePost = createAsyncThunk("posts/fetchOnePost", async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  post: {
    item: {},
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ALL POSTS
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
    //ALL TAGS
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    });
    //ONE POST
    builder.addCase(fetchOnePost.pending, (state) => {
      state.post.item = {};
      state.post.status = "loading";
    });
    builder.addCase(fetchOnePost.fulfilled, (state, action) => {
      state.post.item = action.payload;
      state.post.status = "loaded";
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.post.item = {};
      state.post.status = "loading";
    });
  },
});

export const postsReducer = postsSlice.reducer;
