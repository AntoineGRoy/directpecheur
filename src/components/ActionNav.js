import React from "react";
import SearchContact from "./searchContact";
import Logout from "./logout";
import Profile from "./profile";
import "../css/actionNav.css";

function ActionNav() {
  return (
    <div
      className="actionsNav"
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "baseline",
        flexDirection: "column",
        padding: "0 1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <Profile />
        <Logout />
      </div>
    </div>
  );
}

export default ActionNav;
