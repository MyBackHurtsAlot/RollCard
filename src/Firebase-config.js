import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDPJuGdiuYc1XP8rf96HSvLrkPU-EYO_Qo",
    authDomain: "rollcard.firebaseapp.com",
    projectId: "rollcard",
    storageBucket: "rollcard.appspot.com",
    messagingSenderId: "1002325664152",
    appId: "1:1002325664152:web:63cfc3967c53d689964bed",
    measurementId: "G-3KLWNLMXDM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
