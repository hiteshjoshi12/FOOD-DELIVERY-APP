// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvA8-zQQ11hmPTx-pTta5howTN70mK6cQ",
  authDomain: "food-delivery-app-5f834.firebaseapp.com",
  projectId: "food-delivery-app-5f834",
  storageBucket: "food-delivery-app-5f834.appspot.com",
  messagingSenderId: "491179174343",
  appId: "1:491179174343:web:d6de2f51110c1a94c851e2",
  measurementId: "G-25TFEXQRDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();