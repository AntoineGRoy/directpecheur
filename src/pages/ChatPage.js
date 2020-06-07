import React, { useContext, useEffect } from "react";
import { getUserInfos } from "../helpersFunctions/get.js";
import { UserContext } from "../usercontext";
import ContactsList from "../components/ContactsList";
import FriendRequestList from "../components/FriendRequestList";
import ActionNav from "../components/ActionNav";
import SearchContact from "../components/searchContact";
import paw from "../img/paw.svg";
import "../css/chatPage.css";

//Main User Page - Setting Up userContext
const ChatPage = () => {
  const { userInfos, setUserInfos } = useContext(UserContext);
  useEffect(() => {
    getUserInfos(setUserInfos);
  }, []);
  return (
    <div className="chatPage-container">
      <div className="chatPage-header">
        <img src={paw} style={{ height: "2rem", marginRight: "1rem" }} />
        <h2>{userInfos.username}</h2>
      </div>
      <ActionNav />
      <h2 className="chatPage-intro">My Chatty Friends</h2>
      <div><SearchContact /></div>
      {userInfos && <ContactsList contacts={userInfos.contacts} />}
      <h2 className="chatPage-intro">They want to be your friends</h2>
      {userInfos && <FriendRequestList />}
    </div>
  );
};

export default ChatPage;
