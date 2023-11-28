import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Post } from "../../components";
import { useSelector } from "react-redux";
import { fetchFilterbyTags } from "../../redux/slices/postsSlice";
import { RootState, useAppDispatch } from "../../redux/store";

export const FilterTags: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const { tag } = useParams<{ tag: string }>();

  React.useEffect(() => {
    if (tag) {
      dispatch(fetchFilterbyTags(tag));
    }
  }, []);

  return (
    <>
      <h2>Поиск по тегу: #{tag} </h2>

      <Grid container spacing={2}>
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post id={index} isLoading={true} key={index} />
          ) : (
            <Grid xs={6} item key={obj._id}>
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
            </Grid>
          ),
        )}
      </Grid>
    </>
  );
};
