import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAor7mvsIQBFOpqAIKCjKrdTknFPmmyVIA",
    authDomain: "tienda-581c0.firebaseapp.com",
    databaseURL: "https://tienda-581c0.firebaseio.com",
    projectId: "tienda-581c0",
    storageBucket: "tienda-581c0.appspot.com",
    messagingSenderId: "978834808267",
    appId: "1:978834808267:web:29cb4534a9b5d8aa012a4e"
  };

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, firebase, storage}

