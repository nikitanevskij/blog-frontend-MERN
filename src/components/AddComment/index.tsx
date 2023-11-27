import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import axios from "../../axios";
// import { fetchCommentsById } from "../../redux/slices/commentsSlice";
// import { useAppDispatch } from "../../redux/store";
import { useAddCommentMutation } from "../../redux/commentsApi";

type TIndexProps = {
  postId: string;
};

export const Index: React.FC<TIndexProps> = ({ postId }) => {
  const [text, setText] = React.useState("");
  const [addComment] = useAddCommentMutation();
  // const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      if (text) {
        const comment = {
          text,
          postId,
        };
        await addComment(comment);
      }
      // dispatch(fetchCommentsById(post));
      setText("");
    } catch (err) {
      console.warn(err);
      alert("Не удалось отправить комментарий");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={onSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
