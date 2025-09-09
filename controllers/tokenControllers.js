const Tokens = require("../tokens/tokens");

// Get all tokens
exports.getAllTokens = async (req, res) => {
  try {
    const keys = await Tokens.find({});
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Save new token
exports.saveNewToken = async (req, res) => {
  try {
    const { tokens } = req.body;

    // Check if token already exists
    const exists = await Tokens.findOne({ tokens });
    if (exists) {
      return res.status(200).json({ message: "Token already exists" });
    }

    const newToken = new Tokens(req.body);
    await Tokens.insertOne(newToken);

    res.status(200).json({ message: "Token saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
