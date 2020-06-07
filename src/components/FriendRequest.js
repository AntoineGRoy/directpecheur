import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../usercontext";
import "../css/getUserContacts.css";
import { addContact, removeFriendRequest } from "../helpersFunctions/set";
import { getContactsInfos } from "../helpersFunctions/get";
import "../css/friendRequest.css";
import done from "../img/done.svg";

export const FriendRequest = ({ contactUID }) => {
  //checking for new messages
  const [contact, setContact] = useState({});
  const { userInfos, setUserInfos } = useContext(UserContext);
  const [fs, setFs] = useState(null);
  const [reqAccepted, setReqAccepted] = useState(false);
  //accepting friend requesg
  function handleClick() {
    addContact(contactUID, userInfos.userId); //add contact X to user Y
    addContact(userInfos.userId, contactUID);
    let newContacts = userInfos.contacts;
    newContacts.push(contactUID);

    setUserInfos({
      ...userInfos,

      contacts: newContacts
    });
    removeFriendRequest(contactUID);
    setReqAccepted(true);
  }

  useEffect(() => {
    getContactsInfos(contactUID, setContact, contact);
  }, []);
  console.log(contact);
  useEffect(() => {
    if (contact.username) {
      if (contact.username.length > 12) {
        setFs(300 / contact.username.length);
      } else {
        setFs(22);
      }
    }
    //getFireStoreMessagesCount();
  }, [contact]);
  useEffect(() => {
    console.log(reqAccepted);
  }, [reqAccepted]);

  return (
    <div className="contact-container contact-friend-request-container">
      <div onClick={handleClick} className={`contact-friend-request-overlay ${reqAccepted ? "unactive" : ""}`}></div>
      <div>
        <div className="img-container">
          <img
            style={{ cursor: "pointer" }}
            src={contact.imageUrl}
            alt="avatar-img"
            className={`avatar ${reqAccepted ? "unactive" : ""}`}
          />
        </div>
        <h2 style={{ fontSize: fs }} className="name">
          {reqAccepted && (
            <img
              src={done}
              alt="done"
              style={{
                height: "1rem",
                width: "1rem",
                opacity: 0.9
              }}
            />
          )}
          {contact.username}
        </h2>
      </div>
    </div>
  );
};
