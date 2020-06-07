import React, { useContext } from "react";
import { UserContext } from "../usercontext";
import { FriendRequest } from "./FriendRequest";

const FriendRequestList = () => {
  const { userInfos } = useContext(UserContext);
  console.log(userInfos.friendRequests)
  return (
    <div
      style={{
        display: "flex",
        width: "auto",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >{userInfos.friendRequests&&userInfos.friendRequests.length===0&& <h2 style={{fontWeight:300}}>No request today...</h2>}
      {userInfos.friendRequests &&
        userInfos.friendRequests.map(c => (
          <FriendRequest key={c + "key"} contactUID={c} />
        ))}
        </div>
  );
};
export default FriendRequestList;
