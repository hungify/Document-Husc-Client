import { Avatar, Comment } from "antd";
import { getUserId } from "app/selectors/auth";
import { getConversationId } from "app/selectors/documentDetails";
import { getProfile } from "app/selectors/profile";
import { EVENTS } from "constants/events";
import { useSockets } from "context/socket";
import CommentList from "features/ChatRoom/CommentList";
import Editor from "features/ChatRoom/Editor";
import { addMessage } from "features/DocumentDetails/documentDetailsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatRoom() {
  const [content, setContent] = React.useState("");
  const conversationId = useSelector(getConversationId);
  const dispatch = useDispatch();
  const username = useSelector(getProfile)?.username;
  const avatar = useSelector(getProfile)?.avatar;
  const userId = useSelector(getUserId);

  const { socketClient } = useSockets();

  React.useEffect(() => {
    if (socketClient) {
      if (conversationId) {
        socketClient.emit(EVENTS.CLIENT.CREATE_ROOM, { conversationId });
      }
    }
  }, [conversationId, socketClient]);

  function handleSendMessage() {
    if (!String(content).trim()) {
      return;
    }
    socketClient.emit(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      {
        conversationId,
        content,
        username,
        senderId: userId,
        avatar,
      },
      ({ status }) => {
        if (status === "ok") {
          dispatch(
            addMessage({
              content,
              sender: {
                username,
                avatar,
                _id: userId,
              },
              createdAt: new Date().getTime(),
            })
          );
        }
      }
    );

    setContent("");
  }

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <CommentList />
      <Comment
        avatar={<Avatar>{avatar}</Avatar>}
        content={<Editor onChange={handleChange} onSubmit={handleSendMessage} value={content} />}
      />
    </>
  );
}
