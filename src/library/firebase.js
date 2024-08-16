
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-52dff.firebaseapp.com",
  projectId: "chat-app-52dff",
  storageBucket: "chat-app-52dff.appspot.com",
  messagingSenderId: "12862823381",
  appId: "1:12862823381:web:5fab0889e479679b4f3b5c"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)  