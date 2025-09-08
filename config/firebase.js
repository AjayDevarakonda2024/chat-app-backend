const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIRE_BASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
