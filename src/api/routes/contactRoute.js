const { Router } = require("express");
const contactRoute = Router();
const { isAdmin } = require("../middlewares/adminMiddleware");
const {
  sendContact,
  getContact,
  getAllContact,
} = require("../controllers/contactController");

const { isAuth } = require("../middlewares/authMiddleware");
contactRoute.post("/contact", isAuth, sendContact);
contactRoute.get("/contact/:id", isAuth, isAdmin, getContact);
contactRoute.get("/contacts", isAuth, isAdmin, getAllContact);
module.exports = {
  contactRoute,
};
