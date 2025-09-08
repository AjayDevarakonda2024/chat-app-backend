const mongoose = require("mongoose")

const tokensSchema = new mongoose.Schema(
    {
        "tokens" : {type : String}
    }
)

module.exports = mongoose.model("tokens", tokensSchema)