// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCvDizeCUo-CZIdI-G57gR9jyTS9rh-3w",
  authDomain: "image-9930d.firebaseapp.com",
  projectId: "image-9930d",
  storageBucket: "image-9930d.appspot.com",
  messagingSenderId: "1022991899193",
  appId: "1:1022991899193:web:75020005a28e274b95cbe8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };