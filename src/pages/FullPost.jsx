import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";

import { fetchOnePost } from "../redux/slices/postsSlice";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { fetchCommentsById } from "../redux/slices/commentsSlice";
import { useAppDispatch } from "../redux/store";
import { useGetCommentsByIdQuery } from "../redux/commentsApi";

export const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const userAuth = useSelector((state) => state.user.data);

  const { data = [], isLoading } = useGetCommentsByIdQuery(id);
  // const { comments } = useSelector((state) => state.comments);
  const isLoadedPost = post.status === "loading";
  // const isCommentsLoading = comments.status === "loading";

  React.useEffect(() => {
    dispatch(fetchOnePost(id));
    // dispatch(fetchCommentsById(id));
  }, []);

  if (isLoadedPost) {
    return <Post isLoading={isLoadedPost} isFullPost />;
  }
  return (
    <>
      <Post
        id={post.item._id}
        title={post.item.title}
        imageUrl={post.item.imageUrl ? "http://localhost:4444" + post.item.imageUrl : ""}
        user={post.item.user}
        createdAt={post.item.createdAt}
        viewsCount={post.item.viewsCount}
        commentsCount={3}
        tags={post.item.tags}
        isFullPost
      >
        <ReactMarkdown children={post.item.text} />
      </Post>
      <CommentsBlock items={data} isLoading={isLoading}>
        {userAuth && <Index postId={post.item._id} />}
      </CommentsBlock>
    </>
  );
};
