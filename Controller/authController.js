const Auth = require("../models/Auth.js");
const Developer = require("../models/Developer.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");
const joi = require("joi");
const envPath = path.resolve(process.cwd(), "config", ".env");

const registerSchema = joi.object({
  userName: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

dotenv.config({ path: envPath });

const registerUser = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { userName, email, password } = req.body;

    const existingUser = await Auth.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ id: newUser._id, userName, email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All the fields are required" });

    const user = await Auth.findOne({ email });

    if (!user) return res.status(400).json({ message: "User does not Exist" });

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return res.status(400).json({message : "Invalid Password"})

    const token = jwt.sign({
        id : user._id,
        name : user.userName,
        email : user.email
    },process.env.JWT_SECRET,{expiresIn : "7d"})

    res.status(200).json({userName : user.userName,email : user.email,token})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
