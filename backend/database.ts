import * as admin from "firebase-admin"

const serviceAccount = require("./key.json")





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: 'https://cohorte3-g41.firebaseio.com'
});

const baseDeDatos = admin.firestore()

export{baseDeDatos}