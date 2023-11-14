import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import styles from "./FilterTags.module.scss";
import { Post } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterbyTags } from "../../redux/slices/postsSlice";

export const FilterTags = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const { tag } = useParams();

  React.useEffect(() => {
    dispatch(fetchFilterbyTags(tag));
  }, []);
  return (
    <Grid container spacing={6}>
      <Grid xs={6} item>
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
              // isEditable={userData?._id === obj?.user?._id}
            />
          ),
        )}
      </Grid>
    </Grid>
  );
};
