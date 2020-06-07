import { auth, db } from "../firebase";

const setChatName = (contactName, userName) => {
  let chat = [contactName, userName];
  chat = chat.sort().join("_");
  return chat;
};
export const getFireStoreUnreadMessages = (
  contactName,
  userName,
  setUnreadMessages
) => {
  let chat = setChatName(contactName, userName);
  console.log(chat);
  db.collection("chats")
    .doc(chat)
    .collection("unreadMessages")
    .doc(auth.currentUser.uid)
    .onSnapshot(function(doc) {
      if (doc.data()) {
        //setUnreadMessages(doc.data().unreadMessages);
        setUnreadMessages(doc.data().unreadMessages.unreadMessages);
      } else {
        setUnreadMessages(false);
      }
    });
};

export const getChat = (contactName, userName, setMessages) => {
  let chat = setChatName(contactName, userName);
  db.collection("chats")
    .doc(chat)
    .collection("messages")
    .orderBy("postedAt", "asc")
    .onSnapshot(function(querySnapshot) {
      let allMessages = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        let myMessage = doc.data();
        allMessages.push(myMessage);
      });
      setMessages(allMessages);
    });
};
export const getUserInfos = setUserInfos => {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        let obj = doc.data();
        setUserInfos({ ...obj });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};
export const getContactsInfos = (contactUID, setContact) => {
  db.collection("users")
    .doc(contactUID)
    .get()
    .then(doc => {
      let contactInfos = doc.data();
      console.log(contactInfos);
      return contactInfos;
    })
    .then(contactInfos => {
      setContact(contactInfos);
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};

export const findContact = (setSearchInfo, search, setSearchResults) => {
  db.collection("users")
    .where("username", "==", search)
    .get()
    .then(function(querySnapshot) {
      let userFound;
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        userFound = doc.id;
        setSearchResults([userFound]);
        let loggedUser = auth.currentUser.uid;
        console.log(loggedUser + "found" + userFound);
      });
      return userFound;
    })
    .then(userFound => {
      if (userFound !== undefined) {
        setSearchInfo(null);
      } else {
        setSearchInfo(null);
        setSearchInfo("No user Found");
      }
    })
    .catch(function() {
      setSearchInfo("So Sorry, Something went wrong...");
    });
};
