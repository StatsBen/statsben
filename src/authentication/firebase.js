import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { apiKey } from "./keys";

let config = {
  apiKey: apiKey,
  authDomain: "adventures-v2.firebaseapp.com",
  databaseURL: "https://adventures-v2.firebaseio.com",
  projectId: "adventures-v2",
  storageBucket: "adventures-v2.appspot.com",
  messagingSenderId: "541274129388"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
