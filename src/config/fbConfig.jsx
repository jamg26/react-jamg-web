import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyAVA-xxQcnpWT_tFJOAH11KBttiM0abEPg",
  authDomain: "jamgph.firebaseapp.com",
  databaseURL: "https://jamgph.firebaseio.com",
  projectId: "jamgph",
  storageBucket: "jamgph.appspot.com",
  messagingSenderId: "1012827979727"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
