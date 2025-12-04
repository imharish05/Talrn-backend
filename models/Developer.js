const mongoose = require("mongoose")

const developerSchema = new mongoose.Schema({
    name : {type : String,required : true},
    role : {type : String,required : true},
    techStack : [{type : String,required : true}],
    experience : {type : String,required : true}
})

const developers = mongoose.model("developer",developerSchema)

module.exports = developers;