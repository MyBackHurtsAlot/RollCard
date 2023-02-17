import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// RollCard
const firebaseConfig = {
    apiKey: "AIzaSyDPJuGdiuYc1XP8rf96HSvLrkPU-EYO_Qo",
    authDomain: "rollcard.firebaseapp.com",
    databaseURL:
        "https://rollcard-default-rtdb.asia-southeast1.firebasedatabase.app",
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
