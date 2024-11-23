import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBKE78qKamwYaDK6dDtVvGVMnxRj8DfXsE",
  authDomain: "e-commerce-2937d.firebaseapp.com",
  projectId: "e-commerce-2937d",
  storageBucket: "e-commerce-2937d.firebasestorage.app",
  messagingSenderId: "11382724840",
  appId: "1:11382724840:web:3a1982354199000744d15d",
  measurementId: "G-WVPVPXRNB0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

