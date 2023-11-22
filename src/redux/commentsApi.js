import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444" }),
  endpoints: (build) => ({
    getComments: build.query({
      query: () => "/comments",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments", id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
    getCommentsById: build.query({
      query: (id) => `/comments/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments", id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
    addComment: build.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetCommentsByIdQuery,
  useDeleteCommentMutation,
} = commentsApi;
