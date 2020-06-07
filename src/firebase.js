import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const config = {
    apiKey: "AIzaSyCx9Z6CRQ8yE7oz_-aLLZJFsUsWiO8Hb00",
    authDomain: "chatcat-f3624.firebaseapp.com",
    databaseURL: "https://chatcat-f3624.firebaseio.com",
    projectId: "chatcat-f3624",
    storageBucket: "chatcat-f3624.appspot.com",
    messagingSenderId: "991839890104",
    appId: "1:991839890104:web:50c54b5c7a428f1b44624d",
    measurementId: "G-EN2XFHZ7ST"
};
const firebaseApp= firebase.initializeApp(config)
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();

