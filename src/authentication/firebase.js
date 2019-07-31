import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { apiKey } from "./keys";

let config = {
  apiKey: apiKey,
  authDomain: "adventures-41a04.firebaseapp.com",
  databaseURL: "https://adventures-41a04.firebaseio.com",
  projectId: "adventures-41a04",
  storageBucket: "adventures-41a04.appspot.com",
  messagingSenderId: "220039229793"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
