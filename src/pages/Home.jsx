import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/postsSlice";
import { fetchComments } from "../redux/slices/commentsSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const { comments } = useSelector((state) => state.comments);
  const [sortValue, setSortValue] = React.useState(0);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  const handleChange = (event, newValue) => {
    setSortValue(newValue);
    if (newValue === 0) {
      dispatch(fetchPosts());
      return;
    }
    dispatch(fetchPosts("sort_count"));
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sortValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post id={index} isLoading={true} key={index} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? "http://localhost:4444" + obj.imageUrl : ""}
                user={{
                  avatarUrl: obj?.user?.avatarUrl,
                  fullName: obj?.user?.fullName,
                }}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj?.user?._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
