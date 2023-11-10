import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsSlice";
import fetchAuthSlice from "./slices/authSlice";

const store = configureStore({
  reducer: { posts: postsReducer, user: fetchAuthSlice },
});
export default store;
