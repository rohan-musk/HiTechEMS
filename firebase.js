// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: 'https://hitechtask-f9fc3.firebaseio.com',

    apiKey: "AIzaSyCbVnmrvJvvWR2wI_6BRuu7HCeSlU-A2lA",
    authDomain: "hitechtask-f9fc3.firebaseapp.com",
    projectId: "hitechtask-f9fc3",
    storageBucket: "hitechtask-f9fc3.appspot.com",
    messagingSenderId: "526723578928",
    appId: "1:526723578928:web:e1d1e59c6676982a0a41f5"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app)
// Initialize Firebase
export { auth, db };