const Developers = require("../models/Developer");
const Auth = require("../models/Auth.js");
const joi = require("joi");

const developerSchema = joi.object({
  name: joi.string().required(),
  role: joi.string().required(),
  techStack: joi.array().required(),
  experience: joi.number().min(0).max(50).required(),
  description: joi.string().required(),
  joiningDate: joi.date().required(),
  imageUrl: joi.string().uri().required(),
});

const updateSchema = joi.object({
  name: joi.string().optional(),
  role: joi.string().valid("Frontend", "Backend", "Full-Stack").optional(),
  techStack: joi.array().optional(),
  experience: joi.number().min(0).max(50).optional(),
  description: joi.string().optional(),
  joiningDate: joi.date().optional(),
  imageUrl: joi.string().uri().optional(),
});

const getAllDevelopers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(page - 1) * limit;

    const developers = await Developers.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Developers.countDocuments();

    res.status(200).json({ developers, total, hasMore: page * limit < total });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const setDeveloper = async (req, res) => {
  try {
    const {
      name,
      role,
      techStack,
      experience,
      description,
      joiningDate,
      imageUrl,
    } = req.body;

    const { error } = developerSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const userId = req.user._id || req.user.id;

    const developers = await Developers.findOneAndUpdate(
      { authId: userId },
      {
        $set: {
          name,
          role,
          techStack,
          experience,
          description,
          joiningDate,
          imageUrl,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(developers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) return res.status(400).json("Not Authorized");

    const developer = await Developers.findById({ _id: userId });

    res.status(200).json(developer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDeveloperById = async (req, res) => {
  try {
    const { id } = req.params;

    const developer = await Developers.findById(id);

    console.log(developer);

    if (!developer)
      return res.status(400).json({ message: "User not in the db" });

    const authId = developer.authId;

    await Developers.findByIdAndDelete(id);

    await Auth.findByIdAndDelete(authId);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editDeveloperById = async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;

    const data = req.body;

    const updatedDeveloper = await Developers.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedDeveloper)
      return res.status(404).json({ message: "Developer not Found" });

    res.status(200).json({
      updatedDeveloper,
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllDevelopers,
  setDeveloper,
  getProfileById,
  deleteDeveloperById,
  editDeveloperById,
};
