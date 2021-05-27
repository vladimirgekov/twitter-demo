import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6SHF3MHstNvWfWGHqAm_bS_Sj-TwWd34",
  authDomain: "twitter-9d6d5.firebaseapp.com",
  projectId: "twitter-9d6d5",
  storageBucket: "twitter-9d6d5.appspot.com",
  messagingSenderId: "185212939527",
  appId: "1:185212939527:web:90ffb2fa873f0d65eaa9a2",
  measurementId: "G-0P7CELQBMK"
};
// Initialize Firebase
let app = null;
if (!firebase.app.length) {
  app = firebase.initializeApp(firebaseConfig);
  console.log(app);
}

export default firebase;
export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
