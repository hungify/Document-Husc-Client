import { Comment, List } from "antd";
import React from "react";

export default function CommentList(prop) {
  const { comments } = prop;
  return (
    comments.length > 0 && (
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
      />
    )
  );
}
