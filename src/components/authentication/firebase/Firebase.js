import firebase from "firebase";
import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig ={
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//products
const storage = firebase.storage();
const db = firebase.firestore();
const fs = firebase
//uid



//google
const provider = new firebase.auth.GoogleAuthProvider();


export {auth , provider, storage, db, fs };
export default app;


