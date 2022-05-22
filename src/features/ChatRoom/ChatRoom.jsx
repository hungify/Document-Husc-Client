import { Avatar, Comment } from "antd";
import { getUserId } from "app/selectors/auth";
import { getConversationId } from "app/selectors/documentDetails";
import { EVENTS } from "constants/events";
import { useSockets } from "context/socket";
import CommentList from "features/ChatRoom/CommentList";
import Editor from "features/ChatRoom/Editor";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function ChatRoom() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const [message, setMessage] = React.useState("");
  const userId = useSelector(getUserId);
  const conversationId = useSelector(getConversationId);

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  React.useEffect(() => {
    if (conversationId) {
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomId: conversationId });
    }
  }, [conversationId, socket]);

  function handleSendMessage() {
    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username, sender: userId });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);
    setMessage("");
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <CommentList />
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={<Editor onChange={handleChange} onSubmit={handleSendMessage} value={message} />}
      />
    </>
  );
}
