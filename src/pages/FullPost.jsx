import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";

import { fetchOnePost } from "../redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const isLoadedPost = post.status === "loading";
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchOnePost(id));
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
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
