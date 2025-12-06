const mongoose = require("mongoose")

const developerSchema = new mongoose.Schema({
    authId : {type : mongoose.Schema.Types.ObjectId, ref : "Auth"},
    name : {type : String},
    role : {type : String},
    techStack : [{type : String}],
    experience : {type : String},
    description : {type : String},
    joiningDate : {type : String},
    imageUrl : {type : String}
},{timestamps : true})

const developers = mongoose.model("developer",developerSchema)

module.exports = developers;