const Joi = require("joi");
const path = require("path");
const { v4: uuid } = require("uuid");
const Io = require("../../utils/Io");
const fs = new Io(process.cwd() + "/database/services.json");
const Service = require("../../models/serviceModel");

const getAllService = async (req, res) => {
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

const getOneService = async (req, res) => {
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

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const readData = await fs.readFile();
    const findServiceIndex = readData.findIndex((service) => service.id === id);
    if (findServiceIndex === -1) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    readData.splice(findServiceIndex, 1);
    await fs.writeFile(readData);
    res.status(200).json({
      message: "Successfully deleted service",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePhoto = req.files;
    if (!title || !description || !filePhoto) {
      return res.status(400).json({
        message: "title, description, and photo are required",
      });
    }
    const schema = Joi.object({
      title: Joi.string().max(30),
      description: Joi.string(),
    });
    const { error } = schema.validate({
      title,
      description,
    });
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const readData = await fs.readFile();
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    const newService = new Service(file, title, description);
    readData.push(newService);
    await fs.writeFile(readData);
    await filePhoto.photo.mv(`${process.cwd()}/uploads/${file}`);
    res.status(201).json({
      message: "Service created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const filePhoto = req.files;
    const { title, description } = req.body;
    if (!filePhoto || !title || !description) {
      return res.status(400).json({
        message: "photo, title, and description are required",
      });
    }
    const readData = await fs.readFile();
    const findService = readData.find((service) => service.id === id);
    if (!findService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    findService.title = title;
    findService.description = description;
    findService.photo = file;
    await fs.writeFile(readData);
    res.status(200).json({
      message: "Service edited",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllService,
  getOneService,
  deleteService,
  addService,
  updateService,
};