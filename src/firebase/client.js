import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCZ2YWFcpH60sbt7GbBb64DFCMcJnYQds",
  authDomain: "pataki-1f12d.firebaseapp.com",
  projectId: "pataki-1f12d",
  storageBucket: "pataki-1f12d.appspot.com",
  messagingSenderId: "34513242615",
  appId: "1:34513242615:web:78437aaf09cd2c26b146f2"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();

//Storage

export const getStorage = () => {
  return firebase.storage()
}