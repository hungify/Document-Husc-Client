import ChatBox from "features/ChatRoom/ChatBox";
import { detectURL } from "helpers";
import React from "react";
import "./style.css";
const data = [
  {
    id: 1,
    sender: "Shun",
    senderAvatar: "https://i.pravatar.cc/150?img=32",
    message: "Hello 👋",
  },
  {
    id: 2,
    sender: "Gabe",
    senderAvatar: "https://i.pravatar.cc/150?img=56",
    message: "Hey!",
  },
  {
    id: 3,
    sender: "Gabe",
    senderAvatar: "https://i.pravatar.cc/150?img=56",
    message: "How are you?",
  },
  {
    id: 4,
    sender: "Shun",
    senderAvatar: "https://i.pravatar.cc/150?img=32",
    message: "Great! It's been a while... 🙃",
  },
  {
    id: 5,
    sender: "Gabe",
    senderAvatar: "https://i.pravatar.cc/150?img=56",
    message: "Indeed.... We're gonna have to fix that. 🌮🍻",
  },
];
export default function ChatRoom() {
  const [messages, setMessages] = React.useState(data);
  const [isTyping, setIsTyping] = React.useState([]);

  const sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat,
      };
      setMessages([...messages, newMessageItem]);
      resetTyping(sender);
    }, 400);
  };
  /* updates the writing indicator if not already displayed */
  const typing = (writer) => {
    if (!isTyping[writer]) {
      let stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      setIsTyping(stateTyping);
    }
  };
  /* hide the writing indicator */
  const resetTyping = (writer) => {
    let stateTyping = isTyping;
    stateTyping[writer] = false;
    setIsTyping(stateTyping);
  };
  let users = {};
  let chatBoxes = [];
  users[0] = { name: "Shun", avatar: "https://i.pravatar.cc/150?img=32" };
  users[1] = { name: "Gabe", avatar: "https://i.pravatar.cc/150?img=56" };
  Object.keys(users).map(function (key) {
    var user = users[key];
    chatBoxes.push(
      <ChatBox
        key={key}
        owner={user.name}
        ownerAvatar={user.avatar}
        sendMessage={sendMessage}
        typing={typing}
        resetTyping={resetTyping}
        messages={messages}
        isTyping={isTyping}
      />
    );
  });
  return <div className={"chatApp__room"}>{chatBoxes}</div>;
}
