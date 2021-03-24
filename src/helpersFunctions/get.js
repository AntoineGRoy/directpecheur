import { auth, db } from "../firebase";

export const getOrder = (setOrder,orderUID) => {
  db.collection("orders")
    .doc(orderUID).collection('products')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          let obj = doc.data();
          setOrder({ ...obj });
          console.log(obj)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      
  })
    ;
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
