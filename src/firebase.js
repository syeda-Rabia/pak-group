import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyDiHlhkSodmEoawqMpBuh0kt3YVnHW0f4M",
  authDomain: "pak-group-web-app.firebaseapp.com",
  projectId: "pak-group-web-app",
  storageBucket: "pak-group-web-app.appspot.com",
  messagingSenderId: "441730778186",
  appId: "1:441730778186:web:04ab6b91c0e68e44d852b3",
  measurementId: "G-YXYMRJE37M"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BNZ4erHMpm1Jh74T3r3A_yoWJyhmEAt_3OD_IODToDZMtVLgdefKjFCBchARq16wOuAyPRHCVZ50pIQhHRMZHf4'}).then((currentToken) => {
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