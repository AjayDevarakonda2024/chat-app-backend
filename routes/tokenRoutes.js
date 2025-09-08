const express = require("express");
const { sendNotificationToAll, sendNotificationToUser } = require("../controllers/notificationController");
const controller = require("../controllers/tokenControllers");

const router = express.Router();

// Send to all users
router.post("/send-to-all", sendNotificationToAll);

// Send to one user
router.post("/send-to-user", sendNotificationToUser);

router.get("/", controller.getAllTokens);   // <-- GET /tokens
router.post("/", controller.saveNewToken);  // <-- POST /tokens

module.exports = router;
