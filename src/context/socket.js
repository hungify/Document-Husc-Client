import { getProfile } from "app/selectors/profile";
import { EVENTS } from "constants/events";
import React from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("https://localhost:8000", {
  transports: ["websocket"],
});

const SocketContext = React.createContext({
  socket,
  sender: null,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketProvider(props) {
  const [roomId, setRoomId] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  // const [rooms, setRooms] = React.useState();
  const username = useSelector(getProfile)?.username;

  // socket.on(EVENTS.SERVER.ROOMS, (value) => {
  //   setRooms(value);
  // });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  React.useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        roomId,
        messages,
        setMessages,
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
