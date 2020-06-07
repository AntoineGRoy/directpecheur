import { auth, db } from "../firebase";

export function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
export function createUser(
  userId,
  username,
  email,
  imageUrl,
  contacts,
  friendRequests
) {
  return db
    .collection("users")
    .doc(auth.currentUser.uid)
    .set({
      userId: userId,
      username: username,
      email: email,
      imageUrl: imageUrl,
      contacts: contacts,
      friendRequests: friendRequests
    })
    .then(function() {
      console.log("Document successfully written!" + auth.currentUser);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
