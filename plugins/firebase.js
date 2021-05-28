import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// Initialize Firebase
let app = null;
if (!firebase.default.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyC6SHF3MHstNvWfWGHqAm_bS_Sj-TwWd34",
    authDomain: "twitter-9d6d5.firebaseapp.com",
    projectId: "twitter-9d6d5",
    storageBucket: "twitter-9d6d5.appspot.com",
    messagingSenderId: "185212939527",
    appId: "1:185212939527:web:90ffb2fa873f0d65eaa9a2",
    measurementId: "G-0P7CELQBMK"
  };
  app = firebase.default.initializeApp(firebaseConfig);
}

export const auth = firebase.default.auth();
export const DB = firebase.default.database();
export const StoreDB = firebase.default.firestore();
