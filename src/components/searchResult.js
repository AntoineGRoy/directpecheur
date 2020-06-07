import React, { useEffect, useState, useContext } from "react";
import "../css/getUserContacts.css";
import { getContactsInfos } from "../helpersFunctions/get";
import { addFriendRequest } from "../helpersFunctions/set";
import { UserContext } from "../usercontext";
import { motion } from "framer-motion"

const SearchResult = ({ contactUID, setSearchResults }) => {
  //checking for new messages
  const [requestSent, setRequestSent] = useState(false);
  const [contact, setContact] = useState({});
  const [requestInfos, setRequestInfos] = useState(null);
  const [fs, setFs] = useState(null);
  const { userInfos, setUserInfos } = useContext(UserContext);

  function handleClick() {
    if (!userInfos.contacts.includes(contactUID)) {
      addFriendRequest(contactUID, setRequestSent);
      setRequestInfos("We've asked this cool cat to become your Friend!");
    } else {
      setRequestInfos("This cool cat is already your Friend!");
    }
  }

  useEffect(() => {
    getContactsInfos(contactUID, setContact);
    if (contact.username) {
      if (contact.username.length > 12) {
        setFs(300 / contact.username.length);
      } else {
        setFs(22);
      }
    }
  }, []);
  useEffect(() => {
    if (requestSent) {
      const timer = setTimeout(() => {
        setSearchResults(null)
      }, 5000);

    }
  }, [requestSent]);


  return (
    <div style={{ display: "flex" }}>
      <motion.div
        positionTransition
        onClick={handleClick}
        style={{
          padding: ".75rem",
          borderRadius: "12px",
          border: "1px solid rebeccapurple",
          background: "rgba(102,51,153,.03)",
          width: "150px",
          height: "150px",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div className="img-container">
          <img
            style={{ cursor: "pointer" }}
            alt="avatar"
            src={contact.imageUrl}
            className="avatar"
          />
        </div>
        <h2 style={{ fontSize: fs }} className="name">
          {contact.username}
        </h2>
      </motion.div>
      {requestInfos && <motion.div
        positionTransition
        style={{
          padding: ".75rem",
          marginLeft: "1rem",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "1px solid rebeccapurple",
          background: "rgba(102,51,153,.03)",
          width: "150px",
          height: "150px",
          textAlign: "center",
          position: "relative"
        }}
      >
        {requestInfos}
      </motion.div>}
    </div>
  );
};
export default SearchResult;
