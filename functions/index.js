const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// //databas trigger
// const createNotification = notification => {
//   return admin
//     .firestore()
//     .collection("notifications")
//     .add(notification)
//     .then(doc => console.log("notification added", doc));
// };

// exports.chatCreated = functions.firestore
//   .document("webchat/{webChatId}")
//   .onCreate(doc => {
//     const chat = doc.data();
//     const t = admin.firestore.FieldValue.serverTimestamp();
//     const notification = {
//       content: "New chat message",
//       user: `${chat.user}`,
//       time: t
//     };
//     return createNotification(notification);
//   });

//auth trigger

// exports.userRegistered = functions.auth.user().onCreate(user => {
//   return admin
//     .firestore()
//     .collection("users")
//     .doc(user.uid)
//     .get()
//     .then(doc => {
//       const newUser = doc.data();
//       const notification = {
//         content: "Joined",
//         user: `${newUser.firstName}`,
//         time: admin.firestore.FieldValue.serverTimestamp()
//       };
//       return createNotification(notification);
//     });
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
