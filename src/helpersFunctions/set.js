import { auth, db } from "../firebase";
import firebase from "firebase";

export const addFriendRequest = (contactUID, setRequestSent) => {
  db.collection("users")
    .doc(contactUID)
    .update({
      friendRequests: firebase.firestore.FieldValue.arrayUnion(
        auth.currentUser.uid
      )
    })
    .then(() => {
      setRequestSent(true);
      console.log("friendRequest SENT");
    });
};

export const removeFriendRequest = contactUID => {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .update({
      friendRequests: firebase.firestore.FieldValue.arrayRemove(contactUID)
    })
    .then(() => {
      console.log("friendRequest REMOVED");
    });
};

export const addContact = (contactUID, userUID) => {
  db.collection("users")
    .doc(userUID)
    .update({
      contacts: firebase.firestore.FieldValue.arrayUnion(contactUID)
    })
    .then(() => {
      console.log("friend ADDED");
    });
};

export const sendChat = (chat, userName, localMessage) => {
  let newMessage = {
    text: localMessage.trim(),
    postedAt: new Date().toISOString(),
    sentBy: userName
  };
  db.collection("chats")
    .doc(chat)
    .collection("messages")
    .add(newMessage);
};

export const setFirestoreContactUnreadMessages = (chat, value, contactUID) => {
  db.collection("chats")
    .doc(chat)
    .collection("unreadMessages")
    .doc(contactUID)
    .set({ unreadMessages: value })
    .then(function() {
      console.log("UnreadValue for my contact successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export const setFirestoreUserUnreadMessages = chat => {
  db.collection("chats")
    .doc(chat)
    .collection("unreadMessages")
    .doc(auth.currentUser.uid)
    .set({ unreadMessages: false })
    .then(function() {
      console.log("UnreadValue for my contact successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
