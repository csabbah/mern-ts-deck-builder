// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmISR7URL863GnCSjwT80JBP-gK5sByog",
  authDomain: "mern-ts-deck-builder.firebaseapp.com",
  projectId: "mern-ts-deck-builder",
  storageBucket: "mern-ts-deck-builder.appspot.com",
  messagingSenderId: "700791231685",
  appId: "1:700791231685:web:2a20d58106d2ef969e8cac",
  measurementId: "G-1RP99RYT3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
