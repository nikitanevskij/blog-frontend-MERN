import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { TFetchUser } from "./authSlice";

export interface IComment {
  _id: string;
  text: string;
  user: TFetchUser;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICommentsSliceState {
  comments: {
    items: IComment[];
    status: "loading" | "loaded";
  };
}

export const fetchComments = createAsyncThunk<IComment[]>("comments/fetchComments", async () => {
  const { data } = await axios.get<IComment[]>(`/comments`);
  return data;
});

export const fetchCommentsById = createAsyncThunk<IComment[], string>(
  "comments/fetchCommentsById",
  async (id) => {
    const { data } = await axios.get<IComment[]>(`/comments/${id}`);
    return data;
  },
);

const initialState: ICommentsSliceState = {
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
