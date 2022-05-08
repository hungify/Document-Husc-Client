import { Avatar, Button, Comment, Form, Input } from "antd";
import CommentList from "features/ChatRoom/CommentList";
import React from "react";

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="Nhập vào thông tin phản hồi"
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Gửi phản hồi
      </Button>
    </Form.Item>
  </>
);

export default function ChatRoom() {
  const [comments, setComments] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Nguyễn Kim Ngàn",
          avatar: "Nguyễn Kim Ngàn",
          content: <p>{value}</p>,
          datetime: "2 day ago",
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <CommentList comments={comments} />
      <Comment
        avatar={<Avatar>N</Avatar>}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
}
