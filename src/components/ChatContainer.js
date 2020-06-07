import React, { useRef, useEffect, useState } from "react";
import Message from "./message";
import paw from "../img/paw.svg";
import { setFirestoreContactUnreadMessages } from "../helpersFunctions/set";

function ChatContainer({
  chat,
  sendChat,
  messages,
  contactName,
  contactUID,
  userInfos,
  messagesAreShown,
  setMessagesAreShown
}) {
  const messagesEndRef = useRef(null);
  const [localMessage, setLocalMessage] = useState("");
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView(false, {
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
  };

  /***Handle Click and Submit***/
  const handleSubmit = e => {
    e.preventDefault();
    if (localMessage.trim() !== "") {
      sendChat(chat, userInfos.username, localMessage);
      setFirestoreContactUnreadMessages(
        chat,
        { unreadMessages: true },
        contactUID
      );
      setLocalMessage("");
      scrollToBottom();
    }
  };
  const handleClick = () => {
    setMessagesAreShown(!messagesAreShown);
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div
      className={`chat-container ${
        messagesAreShown ? "chat-container-expanded" : undefined
        }`}
    >
      <div
        className="name-container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <h3 style={{ color: "white", marginLeft: 12 }}>{contactName}</h3>
        <div className="close-x" onClick={handleClick}>
          X
        </div>
      </div>
      <div className="messages-container">
        <div className="messagesUL">
          {messages[0] &&
            messages.map(m => (
              <Message
                key={m.postedAt + m.sentBy}
                data={m}
                username={userInfos.username}
              />
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="input-button-container">
        <form onSubmit={handleSubmit}>
          <input
            style={{ fontSize: 18 }}
            className="chat-input"
            value={localMessage}
            onChange={e => {
              setLocalMessage(e.target.value);
            }}
          />
          <button className="input-button" type="submit">
            <img style={{ height: "2rem", width: "2rem" }} src={paw} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatContainer;
