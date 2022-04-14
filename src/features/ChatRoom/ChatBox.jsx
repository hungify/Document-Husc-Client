import InputMessage from "features/ChatRoom/InputMessage";
import MessageList from "features/ChatRoom/MessageList";
import TypingIndicator from "features/ChatRoom/TypingIndicator";
import React from "react";

export default function ChatBox(props) {
  const { owner, messages, isTyping, ownerAvatar, sendMessage, resetTyping, typing } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const sendMessageLoading = (sender, senderAvatar, message) => {
    setIsLoading(true);
    sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };
  return (
    <div className={"chatApp__conv"}>
      <MessageList owner={owner} messages={messages} />
      <div className={"chatApp__convSendMessage clearfix"}>
        <TypingIndicator owner={owner} isTyping={isTyping} />
        <InputMessage
          isLoading={isLoading}
          owner={owner}
          ownerAvatar={ownerAvatar}
          sendMessage={sendMessage}
          sendMessageLoading={sendMessageLoading}
          typing={typing}
          resetTyping={resetTyping}
        />
      </div>
    </div>
  );
}
