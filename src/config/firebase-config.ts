// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'employees-fire.firebaseapp.com',
  projectId: 'employees-fire',
  storageBucket: 'employees-fire.appspot.com',
  messagingSenderId: '646292729481',
  appId: '1:646292729481:web:6c0fa0cc78a71c634a6058'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
