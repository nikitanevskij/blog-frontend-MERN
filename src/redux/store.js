import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsSlice";
import { commentsReducer } from "./slices/commentsSlice";
import fetchAuthSlice from "./slices/authSlice";

const store = configureStore({
  reducer: { posts: postsReducer, user: fetchAuthSlice, comments: commentsReducer },
});
export default store;
