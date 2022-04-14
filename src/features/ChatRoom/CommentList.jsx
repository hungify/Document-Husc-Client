import { Avatar, Comment, List, Tooltip, Typography } from "antd";
import React from "react";

export default function CommentList(prop) {
  const { comments } = prop;
  return (
    comments.length > 0 && (
      <List
        dataSource={comments}
        header={`${comments.length} phản hồi`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <Comment
            author={<Typography.Text strong>{item.author}</Typography.Text>}
            avatar={<Avatar>{item.author.charAt(0).toUpperCase()}</Avatar>}
            content={<Typography.Paragraph>{item.content}</Typography.Paragraph>}
            datetime={
              <Tooltip title="10:10 AM 20/02/2022">
                <span>{item.datetime} </span>
              </Tooltip>
            }
          />
        )}
      />
    )
  );
}
