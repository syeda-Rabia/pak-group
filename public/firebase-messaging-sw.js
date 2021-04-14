// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDWA4Cv2Nv6ZaDRIPI_gVQZ6D6k-inhanI",
    authDomain: "pak-group-4899b.firebaseapp.com",
    projectId: "pak-group-4899b",
    storageBucket: "pak-group-4899b.appspot.com",
    messagingSenderId: "1077897997545",
    appId: "1:1077897997545:web:289b61be4d8b1b41ce1478",
    measurementId: "G-8XPECXNXB4"
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
