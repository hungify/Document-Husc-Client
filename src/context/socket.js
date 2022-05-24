import { EVENTS } from "constants/events";
import { addMessage } from "features/DocumentDetails/documentDetailsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getAccessToken } from "app/selectors/auth";
import { getConversationId } from "app/selectors/documentDetails";

const socketClient = io.connect(process.env.REACT_APP_API_ENDPOINT, {
  transports: ["websocket"],
  auth: {
    headers: {
      authorization: null,
    },
  },
});

const SocketContext = React.createContext({
  socketClient,
});

function SocketProvider(props) {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const conversationId = useSelector(getConversationId);

  React.useEffect(() => {
    if (socketClient) {
      if (accessToken && conversationId) {
        Object.assign(socketClient.io.opts.auth, {
          headers: {
            authorization: accessToken,
          },
        });
        socketClient.connect();
      }
    } else {
      socketClient.connect();
    }
  }, [accessToken, conversationId, socketClient]);

  React.useEffect(() => {
    socketClient.on("disconnect", () => {
      socketClient.connect();
    });
    socketClient.on("reconnect", () => {
      socketClient.emit(EVENTS.CLIENT.JOIN_ROOM, { conversationId });
    });
  }, [socketClient]);

  React.useEffect(() => {
    socketClient.on(
      EVENTS.SERVER.ROOM_MESSAGE,
      ({ content, username, avatar, createdAt, senderId }) => {
        const message = {
          content,
          sender: {
            username,
            avatar,
            _id: senderId,
          },
          createdAt,
        };
        dispatch(addMessage(message));
      }
    );
  }, [socketClient]);

  return (
    <SocketContext.Provider
      value={{
        socketClient,
      }}
      {...props}
    />
  );
}

export const useSockets = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSockets must be used within a SocketProvider");
  }
  return context;
};
export default SocketProvider;
