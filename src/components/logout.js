import React, { useHistory } from "react";
import { auth } from "../firebase";
import exit from "../img/exit.svg";

function Logout() {
  const backToLogin = () => {
    let path = `/login`;
    useHistory.push(path);
  };
  return (
    <div
      style={{
        width: 150,
        height: "1rem",
        margin: "1rem",
        textAlign: "center",
        cursor: "pointer"
      }}
      onClick={() => {
        auth
          .signOut()
          .then(function () {
            backToLogin();
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      <img
        style={{
          height: "1rem",
          margin: ".5rem",
          transform: "translateY(50%)"
        }}
        alt="logout"
        src={exit}
      />
      Log Out
    </div>
  );
}

export default Logout;
