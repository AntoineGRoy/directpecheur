import { auth, db } from "../firebase";

export function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
export function createUser(
  phone,
    email,
    address,
    password,
    username,
    id
) {
  return db
    .collection("users")
    .doc(auth.currentUser.uid)
    .set({
      phone: phone,
      email: email,
      address: address,
      password: password,
      username: username,
      id:id
    })
    .then(function() {
      console.log("Document successfully written!" + auth.currentUser);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function signin(email, password) {
  let Email=email.toLowerCase();
  return auth.signInWithEmailAndPassword(Email, password);
}
