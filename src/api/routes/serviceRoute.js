const { Router } = require("express");
const serviceRoute = Router();
const { isAdmin } = require("../middlewares/adminMiddleware");
const { isAuth } = require("../middlewares/authMiddleware");

const {
  getAllService,
  getOneService,
  deleteService,
  addService,
  updateService
} = require("../controllers/serviesController");

serviceRoute.get("/services", isAuth, getAllService);
serviceRoute.get("/services/:id", isAuth, getOneService);
serviceRoute.delete("/services/:id", isAuth, isAdmin, deleteService);
serviceRoute.post("/service", isAuth, isAdmin, addService);
serviceRoute.put("/services/:id", isAuth, isAdmin, updateService);
module.exports = {
  serviceRoute,
};
