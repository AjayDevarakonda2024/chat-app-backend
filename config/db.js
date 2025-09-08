const mongoose = require("mongoose")

module.exports = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
}

mongoose.connection.on("connected",()=>{
    console.log("connected to mangodb successfully connected !!")
})

mongoose.connection.on('error', ()=>{
    console.log("connection failed to mangodb")
})