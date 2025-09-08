const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const conn = require("./config/db")

conn()

const notificationRoutes = require("./routes/tokenRoutes");
app.use("/notifications", notificationRoutes);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server listening to port no.3000")
})