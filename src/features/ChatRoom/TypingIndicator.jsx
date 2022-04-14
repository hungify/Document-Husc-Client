export default function TypingIndicator({ owner, isTyping }) {
  let typersDisplay = "";
  let countTypers = 0;
  /* for each user writing messages in chatroom */
  for (var key in isTyping) {
    /* retrieve the name if it isn't the owner of the chatbox */
    if (key !== owner && isTyping[key]) {
      typersDisplay += ", " + key;
      countTypers++;
    }
  }
  /* formatting text */
  typersDisplay = typersDisplay.slice(1);
  typersDisplay += countTypers > 1 ? " are " : " is ";
  if (countTypers > 0) {
    return (
      <div className={"chatApp__convTyping"}>
        {typersDisplay} writing
        <span className={"chatApp__convTypingDot"}></span>
      </div>
    );
  }
  return <div className={"chatApp__convTyping"}></div>;
}
