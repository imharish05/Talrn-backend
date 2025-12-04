const express = require("express")
const dotenv= require("dotenv")
const path=require("path")
const connectDB = require("./config/connectDb.js")

const envPath = path.resolve(process.cwd(),"config",".env")

dotenv.config({path : envPath})
const app = express()
const cors = require("cors")

const developerRoutes = require("./Routes/developerRoutes.js")

const PORT = process.env.PORT || 5000

connectDB()

app.use(
  cors()
);

app.get("/",(req,res)=>{
    res.send("Test Server")
})

// Routes
app.use("/",developerRoutes)

app.listen(PORT,()=>{
    console.log("Server running on PORT",PORT)
})