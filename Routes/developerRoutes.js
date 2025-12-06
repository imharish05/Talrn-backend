const express = require("express")
const { setDeveloper, getAllDevelopers, getProfileById,deleteDeveloperById,editDeveloperById } = require("../Controller/developerController")

const router = express.Router()

const protect = require("../Middlewares/authMiddleware.js")

router.get("/developers",protect,getAllDevelopers)
router.post("/developers",protect,setDeveloper)
router.get("/developer/:id",protect,getProfileById)
router.delete("/developer/:id",protect,deleteDeveloperById)
router.put("/developer/edit/:id",protect,editDeveloperById)

module.exports = router;