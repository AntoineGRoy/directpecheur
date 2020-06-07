import React, { useState } from "react";
import { Contact } from "./Contact";



const ContactsList = ({ contacts }) => {
  console.log("CONTACTLIST: " + contacts);
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "auto",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        {contacts &&
          contacts[0] !== null &&
          contacts.map(c => <Contact key={c + "key"}
            contactUID={c}

          />)}
        {!contacts && <p>loading...</p>}
      </div>
    </div>
  );
};
export default ContactsList;
