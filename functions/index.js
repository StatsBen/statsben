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
// const { ref } = require("firebase-functions/lib/providers/database");
admin.initializeApp();

// const cors = require('cors')({origin: true});

exports.getEntriesCount = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");

  let types = null;

  if (req.query && req.query.types) types = req.query.types;
  else if (req.body && req.body.data && req.body.data.types) types = req.body.data.types;

  let snap = await admin
    .firestore()
    .collection("entries")
    .get()
    .catch(() => {
      res.status(500).json({
        error: "Couldn't get count",
        types: types ? types : "all"
      });
    });

  let count;

  if (types) {
    const entries = await snap.docs.map(doc => doc.data());

    let activeEntries = entries.filter(
      entry => entry && entry.types && entry.types[types]
    );

    count = activeEntries.length;
  } else {
    count = snap.size;
  }

  res.status(200).json({
    data: {
      count,
      q: req.query,
      b: req.body,
      types: types ? types : "all"
    }
  });

  // return {
  //   count,
  //   types: req.query.types ? req.query.types : "all"
  // };
});
