import { initializeApp } from "firebase/app";
import {API_Key} from '@env'
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: API_Key,
  authDomain: "j-anime-77fed.firebaseapp.com",
  projectId: "j-anime-77fed",
  storageBucket: "j-anime-77fed.appspot.com",
  messagingSenderId: "751364835182",
  appId: "1:751364835182:web:b6a7a57fceebacda89637f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();