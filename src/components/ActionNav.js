import React from "react";
import { getUserInfos } from "../helpersFunctions/get";
import Logout from "./logout";
import {NavLink}from "react-router-dom"
import Profile from "./profile";
//import "../css/actionNav.css";

function ActionNav({userInfos}) {
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
        <Logout />
      </div>
    </div>
  );
}

export default ActionNav;
