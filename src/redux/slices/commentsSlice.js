import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const { data } = await axios.get(`/comments`);
  return data;
});

export const fetchCommentsById = createAsyncThunk("comments/fetchCommentsById", async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ALL COMMENTS
    builder.addCase(fetchComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
    //ALL COMMENTS BY POST
    builder.addCase(fetchCommentsById.pending, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
    builder.addCase(fetchCommentsById.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    });
    builder.addCase(fetchCommentsById.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
