// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_API_KEY}`,
	authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
	databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
	projectId: `${process.env.REACT_APP_PROJECT_ID}`,
	storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_MESSENGER_SENDER_ID}`,
	appId: `${process.env.REACT_APP_APP_ID}`,
	measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};
console.log(firebaseConfig);

const tangoConfig = {
	tangoApiKey: `${process.env.REACT_APP_TANGO_API_KEY}`,
	tangoDatabaseURL: `${process.env.REACT_APP_TANGO_DATABASE_URL}`
};
console.log(tangoConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	tangoConfig
};
