import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useDeleteCommentMutation } from "../redux/commentsApi";
import { useSelector } from "react-redux";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  const [deleteComment] = useDeleteCommentMutation();
  const userData = useSelector((state) => state.user.data);
  const deleteById = async (id) => {
    deleteComment(id);
  };
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText primary={obj.user.fullName} secondary={obj.text} />
              )}

              {children && obj?.user?._id === userData?._id ? (
                <Button
                  sx={{ marginTop: "10px" }}
                  color="error"
                  onClick={() => deleteById(obj._id)}
                >
                  Удалить
                </Button>
              ) : (
                ""
              )}
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
