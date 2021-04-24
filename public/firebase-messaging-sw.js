// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDiHlhkSodmEoawqMpBuh0kt3YVnHW0f4M",
  authDomain: "pak-group-web-app.firebaseapp.com",
  projectId: "pak-group-web-app",
  storageBucket: "pak-group-web-app.appspot.com",
  messagingSenderId: "441730778186",
  appId: "1:441730778186:web:04ab6b91c0e68e44d852b3",
  measurementId: "G-YXYMRJE37M"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
