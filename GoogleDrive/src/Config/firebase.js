import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT_1,
  authDomain: "drive-ebec7.firebaseapp.com",
  projectId: "drive-ebec7",
  storageBucket: "drive-ebec7.firebasestorage.app",
  messagingSenderId: "324659554292",
  appId: "1:324659554292:web:4d222d91448c10dac23ba1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);