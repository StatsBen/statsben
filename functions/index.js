const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
const { ref } = require("firebase-functions/lib/providers/database");
admin.initializeApp();

exports.getEntriesCount = functions.https.onRequest(async (req, res) => {
  let snap = await admin
    .firestore()
    .collection("entries")
    .get()
    .catch(() => {
      res.status(500).json({
        error: "Couldn't get count",
        types: req.query.types ? req.query.types : "all"
      });
    });

  let count;

  if (req.query.types) {
    const entries = await snap.docs.map(doc => doc.data());

    let activeEntries = entries.filter(
      entry => entry && entry.types && entry.types[req.query.types]
    );

    count = activeEntries.length;

    res.status(200).json({
      count,
      types: req.query.types ? req.query.types : "all"
    });
    
  } else {
    count = snap.size;
    res.status(200).json({
      count,
      types: req.query.types ? req.query.types : "all"
    });
  }
});
