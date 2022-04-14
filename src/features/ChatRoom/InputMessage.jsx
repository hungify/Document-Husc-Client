export default function InputMessage({
  isLoading,
  owner,
  ownerAvatar,
  sendMessageLoading,
  typing,
  resetTyping,
}) {
  const handleSendMessage = (event) => {
    // event.preventDefault();
    // /* Disable sendMessage if the message is empty */
    // if (messageInput.value.length > 0) {
    //   sendMessageLoading(ownerInput.value, ownerAvatarInput.value, messageInput.value);
    //   /* Reset input after send*/
    //   messageInput.value = "";
    // }
  };
  const handleTyping = (event) => {
    // /* Tell users when another user has at least started to write */
    // if (messageInput.value.length > 0) {
    //   typing(ownerInput.value);
    // } else {
    //   /* When there is no more character, the user no longer writes */
    //   resetTyping(ownerInput.value);
    // }
  };

  var loadingClass = isLoading ? "chatApp__convButton--loading" : "";
  let sendButtonIcon = <i className={"material-icons"}>send</i>;
  return (
    <form onSubmit={handleSendMessage}>
      <input type="hidden" value={owner} />
      <input type="hidden" value={ownerAvatar} />
      <input
        type="text"
        className={"chatApp__convInput"}
        placeholder="Text message"
        onKeyDown={handleTyping}
        onKeyUp={handleTyping}
        tabIndex="0"
      />
      <div className={"chatApp__convButton " + loadingClass} onClick={handleSendMessage}>
        {sendButtonIcon}
      </div>
    </form>
  );
}
