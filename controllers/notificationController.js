const Tokens = require("../tokens/tokens");
const axios = require("axios");

// Expo push API endpoint
const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

// Helper to send notification
const sendExpoNotification = async (token, title, body, link) => {
  return axios.post(EXPO_PUSH_URL, {
    to: token,
    sound: "default",
    title,
    body,
    data: { link: link || null },
  },
  {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }
);
};

// Send notification to **all users**
exports.sendNotificationToAll = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Get all stored tokens from DB
    const tokenDocs = await Tokens.find({});
    const tokens = tokenDocs.map(t => t.token).flat();

    if (tokens.length === 0) {
      return res.status(404).json({ message: "No tokens found" });
    }

    // Send notifications
    const promises = tokens.map(token => sendExpoNotification(token, title, body));
    const responses = await Promise.allSettled(promises);

    const successCount = responses.filter(r => r.status === "fulfilled").length;
    const failureCount = responses.filter(r => r.status === "rejected").length;

    res.status(200).json({
      success: successCount,
      failed: failureCount,
      responses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send notification to **specific user**
exports.sendNotificationToUser = async (req, res) => {
  try {
    const { token, title, body} = req.body;

    const response = await sendExpoNotification(token, title, body);

    res.status(200).json({ success: true, response: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
