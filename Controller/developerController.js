const mongoose= require("mongoose");
const Developers = require("../models/Developer");

const getDeveloper = async(req,res) =>{
    try{
        const developers = await Developers.find()

        res.status(200).json({developers : developers})
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}

const setDeveloper = async(req,res) => {
    try{
        const {
            name,
            role,
            techStack,
            experience
        } = req.body;

        if(!name || !role ||!techStack ||!experience < 0) return res.status(400).json({message : "Required files are needed"})
        
        const developers = await Developers.create({
            name,
            role,
            techStack,
            experience
        })
        
        res.status(201).json(developers)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports = {getDeveloper,setDeveloper}