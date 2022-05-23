import { Comment, List, Typography, Avatar, Tooltip } from "antd";
import React from "react";
import { getConversationId, getMessages } from "app/selectors/documentDetails";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getUserId } from "app/selectors/auth";

export default function CommentList() {
  const messages = useSelector(getMessages);
  const userId = useSelector(getUserId);
  const conversationId = useSelector(getConversationId);

  if (!conversationId) {
    return <div />;
  }

  return (
    messages?.length > 0 && (
      <List
        dataSource={messages}
        header={`${messages.length} phản hồi`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <Comment
            author={
              <Typography.Text strong>
                {userId === item?.sender._id ? "Bạn" : item?.sender?.username}
              </Typography.Text>
            }
            avatar={<Avatar>{item?.sender?.avatar}</Avatar>}
            content={<Typography.Paragraph>{item.content}</Typography.Paragraph>}
            datetime={
              <Tooltip title={dayjs(item.createdAt).format("HH:MM DD/MM/YYYY")}>
                <span>{dayjs(item?.createdAt).format("DD/MM/YYYY")} </span>
              </Tooltip>
            }
          />
        )}
      />
    )
  );
}
