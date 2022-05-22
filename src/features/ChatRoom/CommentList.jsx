import { Comment, List, Typography, Avatar, Tooltip } from "antd";
import { useSockets } from "context/socket";
import React from "react";

export default function CommentList() {
  const { messages, roomId } = useSockets();
  if (!roomId) {
    return <div />;
  }

  return (
    messages.length > 0 && (
      <List
        dataSource={messages}
        header={`${messages.length} phản hồi`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <Comment
            author={<Typography.Text strong>{item.username}</Typography.Text>}
            avatar={<Avatar>{item.username.charAt(0).toUpperCase()}</Avatar>}
            content={<Typography.Paragraph>{item.message}</Typography.Paragraph>}
            datetime={
              <Tooltip title="10:10 AM 20/02/2022">
                <span>{item.time} </span>
              </Tooltip>
            }
          />
        )}
      />
    )
  );
}
