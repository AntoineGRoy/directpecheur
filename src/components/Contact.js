import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../usercontext";
import "../css/getUserContacts.css";
import ChatContainer from "./ChatContainer";
import { AnimatePresence, motion } from "framer-motion";
import {
  getContactsInfos,
  getChat,
  getFireStoreUnreadMessages
} from "../helpersFunctions/get";
import {
  sendChat,
  setFirestoreUserUnreadMessages
} from "../helpersFunctions/set";
import paw from "../img/paw-alert.svg"

export const Contact = ({ contactUID }) => {
  //checking for new messages
  const [contact, setContact] = useState({});
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState({});
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [messagesAreShown, setMessagesAreShown] = useState(false);
  const { userInfos } = useContext(UserContext);
  const [fs, setFs] = useState(null);

  function handleClick() {
    setMessagesAreShown(!messagesAreShown);
    console.log(messages.length);
    setUnreadMessages(false);
    let chat = [contact.username, userInfos.username];
    chat = chat.sort().join("_");
    setChat(chat);
    setFirestoreUserUnreadMessages(
      contact.username,
      contactUID,
      userInfos.username
    );
  }

  useEffect(() => {
    getContactsInfos(contactUID, setContact, contact);
  }, []);
  console.log(contact);
  useEffect(() => {
    getChat(contact.username, userInfos.username, setMessages);
    if (contact.username) {
      if (contact.username.length > 12) {
        setFs(300 / contact.username.length);
      } else {
        setFs(22);
      }
    }
    //getFireStoreMessagesCount();
  }, [contact.username]);
  useEffect(
    () =>
      getFireStoreUnreadMessages(
        contact.username,
        userInfos.username,
        setUnreadMessages
      ),
    [messages]
  );

  return (
    <div
      className={`contact-container ${
        messagesAreShown ? "contact-container-reduced" : undefined
        }`}
    >
      <div
        onClick={handleClick}
        className={`user-container ${
          messagesAreShown ? "user-container-reduced" : undefined
          }`}
      >
        <div className="img-container">
          <img
            alt={`avatar-${contact.username}`}
            style={{ cursor: "pointer" }}
            src={contact.imageUrl}
            className={`avatar ${
              messagesAreShown ? "avatar-reduced" : undefined
              }`}
          />
        </div>
        <h2
          style={{ fontSize: fs }}
          className={`name ${messagesAreShown ? "name-reduced" : undefined}`}
        >
          {contact.username}
        </h2>
        {unreadMessages && (
          <AnimatePresence>
            <motion.div
              className="alert-message"
              key={contact.username + "alert"}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                loop: Infinity,
                ease: "linear",
                duration: 2
              }}
            ><img alt="paw" src={paw} style={{ width: "1rem" }} /></motion.div>
          </AnimatePresence>
        )}
      </div>
      {messagesAreShown && (
        <AnimatePresence>
          <motion.div
            key={contactUID}
            initial={{
              height: 0,
              width: 0,
              position: "absolute",
              top: 0,
              left: 0,
              transform: "translate(0,0)"
            }}
            animate={{
              height: "auto",
              width: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
            exit={{
              height: 0,
              width: 0,
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(0,0)"
            }}
          >
            <ChatContainer
              contactName={contact.username}
              contactUID={contact.uid}
              messages={messages}
              setUnreadMessages={setUnreadMessages}
              userInfos={userInfos}
              sendChat={sendChat}
              chat={chat}
              contactUID={contact.userId}
              messagesAreShown={messagesAreShown}
              setMessagesAreShown={setMessagesAreShown}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
