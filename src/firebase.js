import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyDWA4Cv2Nv6ZaDRIPI_gVQZ6D6k-inhanI",
  authDomain: "pak-group-4899b.firebaseapp.com",
  projectId: "pak-group-4899b",
  storageBucket: "pak-group-4899b.appspot.com",
  messagingSenderId: "1077897997545",
  appId: "1:1077897997545:web:289b61be4d8b1b41ce1478",
  measurementId: "G-8XPECXNXB4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BFfkwcqgo_S4uuZ5xjw-LZKc5IeiD6kILC8ATvkXNHv6g3JtOVeLnQZDyifMV23sPuVbzxG8Vz95D6KRQv-ra7s'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      localStorage.setItem("firebaseToken",currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});