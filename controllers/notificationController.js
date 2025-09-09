const Tokens = require("../tokens/tokens");
const admin = require("../config/firebase");

// Send notification to **all users**
exports.sendNotificationToAll = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Get all stored tokens from DB
    const tokenDocs = await Tokens.find({});
    const tokens = tokenDocs.map(t => t.tokens);

    if (tokens.length === 0) {
      return res.status(404).json({ message: "No tokens found" });
    }

    // Create notification payload
    const message = {
      notification: { title, body },
      tokens: tokens
    };

    // Send notification
    const response = await admin.messaging().sendEachForMulticast(message);
    res.status(200).json({
      success: response.successCount,
      failed: response.failureCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send notification to **specific user**
exports.sendNotificationToUser = async (req, res) => {
  try {
    const { token, title, body } = req.body;

    const message = {
      notification: { title, body },
      token: token
    };

    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
