import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsSlice";
import { commentsReducer } from "./slices/commentsSlice";
import fetchAuthSlice from "./slices/authSlice";
import { useDispatch } from "react-redux";
import { commentsApi } from "./commentsApi";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: fetchAuthSlice,
    comments: commentsReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
