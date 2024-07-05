import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1WVTCVroUWYUv0Rk3C6lEe-a5feGVTYo",
    authDomain: "miniblog-a1bfc.firebaseapp.com",
    projectId: "miniblog-a1bfc",
    storageBucket: "miniblog-a1bfc.appspot.com",
    messagingSenderId: "821990872299",
    appId: "1:821990872299:web:994722ed4fba8d20489aae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }