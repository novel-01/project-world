const Joi = require("joi");
const path = require("path");
const { v4: uuid } = require("uuid");
const Io = require("../../utils/Io");
const fs = new Io(process.cwd() + "/database/feedbacks.json");
const Service = require("../../models/serviceModel");

const getAllFeedbacks = async (req, res) => {
  try {
    const readData = await fs.readFile();
    res.json({
      data: readData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOneFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const readData = await fs.readFile();
    const oneService = readData.find((service) => service.id === id);

    if (!oneService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      data: oneService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const readData = await fs.readFile();
    const findServiceIndex = readData.findIndex((service) => service.id === id);

    if (findServiceIndex === -1) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    readData.splice(findServiceIndex, 1);
    await fs.writeFile(readData);

    res.status(200).json({
      message: "Feedback deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const addFeedback = async (req, res) => {
  try {
    const { title } = req.body;
    const filePhoto = req.files;

    if (!title || !filePhoto) {
      return res.status(400).json({
        message: "title, photo are required",
      });
    }

    const schema = Joi.object({
      title: Joi.string().max(30),
    });

    const { error } = schema.validate({ title });

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const readData = await fs.readFile();
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    const newService = new Service(file, title);
    readData.push(newService);

    await filePhoto.photo.mv(`${process.cwd()}/uploads/${file}`);
    await fs.writeFile(readData);

    res.status(201).json({
      message: "Feedback created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { title } = req.body;
    const filePhoto = req.files;

    if (!title || !filePhoto) {
      return res.status(400).json({
        message: "title and photo are required",
      });
    }

    const { id } = req.params;
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    const readData = await fs.readFile();
    const findFeedback = readData.find((feedback) => feedback.id === id);

    if (!findFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    findFeedback.title = title;
    findFeedback.photo = file;

    await fs.writeFile(readData);

    res.status(200).json({
      message: "Feedback edited",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllFeedbacks,
  getOneFeedback,
  deleteFeedback,
  addFeedback,
  updateFeedback,
};