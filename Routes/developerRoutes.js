const express = require("express")
const { setDeveloper, getDeveloper } = require("../Controller/developerController")

const router = express.Router()

router.get("/developers",getDeveloper)
router.post("/developers",setDeveloper)

module.exports = router;