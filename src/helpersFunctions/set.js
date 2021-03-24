import { auth, db } from "../firebase";
import firebase from "firebase";

export const AddProductToFirestore=(setDetailsAreShown, setProduct, product)=>{
  let docId;
  db.collection('products').add(product).then((doc)=>{
    docId=doc.id;
    db.collection("products").doc(doc.id).set({id:doc.id},{merge:true})
  }).then(()=>{
    setProduct({...product,id:docId})
  }).catch(function(error) {
    console.error("Error adding document: ", error);
});
};
export const RemoveProductFromOrder = async (productUID, orderUID) => {
  if(orderUID&&productUID){db.collection("orders")
  .doc(orderUID)
  .collection("products")
  .doc(productUID).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});}
};

export const confirmOrder= (setOrderConfirmed, orderUID, username, deliveryAddress, phone, deliveryTime, totalPrice)=>{
  let today=new Date()
  let infos={id:orderUID, date:today.toDateString(),status:"confirmed", username:username, address: deliveryAddress, phone:phone, time:deliveryTime, price:totalPrice}
db.collection("orders").doc(orderUID).set({...infos},{merge:true}).then(()=>{
  setOrderConfirmed(true);
})
}

export const AddProductToOrder = async (setDetailsAreShown, setMessage,price,orderUID, setOrderUID, localQuantity, productUID, productName,username,userUID) => {
  let newProduct = {
    quantity:localQuantity,
    orderUID:orderUID,
    price:price,
    name:productName,
    productUID:productUID,
    postedAt: new Date().toISOString(),
    sentBy: username,
    userUID:userUID,
  };
  db.collection("orders")
    .doc(orderUID
      )
    .collection("products")
    .add(newProduct).then((doc)=>{
      db.collection("orders")
    .doc(orderUID
      )
    .collection("products").doc(doc.id).set({id:doc.id},{merge:true})
    }).then(()=>{
      setDetailsAreShown(false);
    }).catch(function(error) {
      setMessage("Erreur!")
      console.error("Error adding document: ", error);
  });
};

export const setFirestoreInOrderProductNewQuantity = (orderUID,productUID, value) => {
  let numberValue=parseInt(value);
  const increment = firebase.firestore.FieldValue.increment(numberValue);
  db.collection("orders").doc(orderUID)
    .collection("products")
    .doc(productUID)
    .set({ quantity:increment },{ merge: true })
    .then(function() {
      console.log("Quantity Value for my product successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export const setFirestoreProductNewQuantity = (productUID, value) => {
  let numberValue=parseInt(value);
  const increment = firebase.firestore.FieldValue.increment(-numberValue);
  db.collection("products")
    .doc(productUID)
    .set({ quantity:increment },{ merge: true })
    .then(function() {
      console.log("Quantity Value for my product successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};


export const addOrder = (productUID, setRequestSent) => {
  db.collection("orders")
    .doc(productUID)
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

export const removeProductFromOrder = (orderUID,productUID) => {
  db.collection("orders")
    .doc(orderUID).collection('products')
    .doc(productUID).delete()
    .then(() => {
      console.log("product REMOVED");
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
