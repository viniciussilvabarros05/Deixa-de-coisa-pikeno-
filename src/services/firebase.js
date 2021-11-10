
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD5GiCwsS1Hf66o7L2NwGZiZvoI86mfeEk",
    authDomain: "deixa-de-coisa-pikeno.firebaseapp.com",
    projectId: "deixa-de-coisa-pikeno",
    storageBucket: "deixa-de-coisa-pikeno.appspot.com",
    messagingSenderId: "42095564332",
    appId: "1:42095564332:web:47b0f63c0e874036202389"
};


firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()