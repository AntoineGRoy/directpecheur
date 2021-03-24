import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const config = {
    apiKey: "AIzaSyAlBaCFinB-aIngyUsjgwjRxGvyrJmnA-c",
    authDomain: "direct-pecheur.firebaseapp.com",
    databaseURL: "https://direct-pecheur-default-rtdb.firebaseio.com",
    projectId: "direct-pecheur",
    storageBucket: "direct-pecheur.appspot.com",
    messagingSenderId: "818286468462",
    appId: "1:818286468462:web:6724b007647e3f9d92b57f",
    measurementId: "G-GJJZR103LJ"
};
const firebaseApp= firebase.initializeApp(config)
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();

