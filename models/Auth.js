const mongoose = require("mongoose")

const authSchema = new mongoose.Schema(
    {
        userName : {type : String},
        email : {type : String},
        password : {type : String}
    },{timestamps : true}
)

const Auth = mongoose.model("Auth",authSchema)

module.exports = Auth;
