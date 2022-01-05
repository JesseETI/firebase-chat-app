const functions = require("firebase-functions");
const Filter = require("bad-words");

const admin = require("firebase-admin");
admin.initializeApp();

const firestoreDB = admin.firestore();

exports.banBadMouthers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data;

    if (filter.isProfane(text)) {
      const cleanedText = filter.clean(text);
      doc.ref.update({
        text: `I got a LIFETIME ban for saying ${cleanedText}`,
      });

      await firestoreDB.collection("banned").doc(uid).set({});
    }
  });
