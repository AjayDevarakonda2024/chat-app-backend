const mongoose = require("mongoose")

const tokensSchema = new mongoose.Schema(
    {
        "token" : {type : String}
    }
)

module.exports = mongoose.model("tokens", tokensSchema)