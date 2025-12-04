const mongoose = require("mongoose")
const dotenv= require("dotenv")
const path=require("path")
dotenv.config(path.resolve(process.cwd("config",".env")))
const envPath = path.resolve(process.cwd(),"config",".env")
dotenv.config({path : envPath})

const mongoURL = process.env.DB_URL

const connectDB = async() =>{
    try{
        await mongoose.connect(mongoURL)
        console.log("Mongo connected Successfully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB;