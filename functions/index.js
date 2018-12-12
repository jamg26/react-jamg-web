const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment-timezone");
const settings = { timestampsInSnapshots: true };
admin.initializeApp(functions.config().firebase);
admin.firestore().settings(settings);

const botReply = data => {
  return admin
    .firestore()
    .collection("webchat")
    .add({
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/jamgph.appspot.com/o/profiles%2Frobot02_90810.png?alt=media&token=8c916fd1-b87f-469b-9ec8-03bd3b580007",
      message: data,
      date: admin.firestore.FieldValue.serverTimestamp(),
      user: "CHATBOT"
    })
    .then(() => {})
    .catch(e => {});
};

const random = len => {
  return Math.floor(Math.random() * len);
};

exports.jamgBot = functions.firestore
  .document("webchat/{chatId}")
  .onCreate(doc => {
    const data = doc.data();
    const msg = data.message.toLowerCase();
    //replies
    const greetings = ["hi ", "hello ", "uy ", "musta "];
    const jamg = [
      "ano po need nyo kay jam?",
      "wla po sya dto",
      "sya po gumawa sakin"
    ];
    //chatbot
    if (data.user !== "CHATBOT") {
      //chatbot commands
      if (msg === "!time")
        botReply(
          `${moment()
            .tz("Asia/Manila")
            .format("LT")}`
        );
      if (msg === "!date")
        botReply(
          `${moment()
            .tz("Asia/Manila")
            .format("LL")}`
        );

      //chatbot listening
      if (msg === "hi" || msg === "hi!" || msg.includes("hello"))
        botReply(greetings[random(greetings.length)] + " " + data.user);

      //if (msg.includes("jam")) botReply(jamg[random(jamg.length)]);

      //if (msg.includes("jamuel")) botReply("shh");

      if (msg.includes("musta"))
        botReply("ayos naman ikaw " + data.user + " kamusta?");

      if (msg.includes("chix")) botReply("uy may chix ? asan <3");

      // if (msg.includes("spotify") || msg.includes("crunchyroll"))
      //   botReply("wait lang po kayo mag release si jam");

      if (msg.includes("netflix"))
        botReply("hindi pa po kami ng rrelease ng netflix paps");

      if (
        msg.includes("gago") ||
        msg.includes("pota") ||
        msg.includes("yawa") ||
        msg.includes("tang ina") ||
        msg.includes("tangina")
      )
        botReply("uy bawal magmura");

      if (msg.includes(" bot ") || msg.includes("chatbot"))
        botReply("bakit po");

      //if (msg.includes("pogi")) botReply("ha? pogi ? si jam un");

      if (msg.includes("pangit") || msg.includes("panget"))
        botReply("sinong panget?");
    }
    return true;
  });

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
