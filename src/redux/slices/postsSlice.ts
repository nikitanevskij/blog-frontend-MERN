import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { TFetchUser } from "./authSlice";

type TSortPosts = "sort_new" | "sort_count";
type TDeletePost = {
  success: boolean | string;
};

export interface IPost {
  _id: string;
  title: string;
  text: string;
  tags: string;
  viewsCount: number;
  user: TFetchUser;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IPostSliceState {
  posts: {
    items: [] | IPost[];
    status: "loading" | "loaded";
  };
  tags: {
    items: [] | String[];
    status: "loading" | "loaded";
  };
  post: {
    item: {};
    status: "loading" | "loaded";
  };
}
export const fetchPosts = createAsyncThunk<IPost[], TSortPosts>(
  "posts/fetchPosts",
  async (sort) => {
    const { data } = await axios.post<IPost[]>(`/posts`, { sort });
    return data;
  },
);

export const fetchTags = createAsyncThunk<String[]>("posts/fetchTags", async () => {
  const { data } = await axios.get<String[]>("/tags");
  return data;
});

export const fetchFilterbyTags = createAsyncThunk<IPost[], string>("posts/tags", async (tag) => {
  const { data } = await axios.post<IPost[]>("/posts/tags", { filterTag: tag });
  return data;
});

export const fetchOnePost = createAsyncThunk<IPost, string>("posts/fetchOnePost", async (id) => {
  const { data } = await axios.get<IPost>(`/posts/${id}`);
  return data;
});

export const fetchRemovePost = createAsyncThunk<TDeletePost, number>(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete<TDeletePost>(`/posts/${id}`);
    return data;
  },
);

const initialState: IPostSliceState = {
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
    //DELETE POST
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      //@ts-ignore
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    });
    //FILTER BY TAG
    builder.addCase(fetchFilterbyTags.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
    builder.addCase(fetchFilterbyTags.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    });
    builder.addCase(fetchFilterbyTags.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
  },
});

export const postsReducer = postsSlice.reducer;
