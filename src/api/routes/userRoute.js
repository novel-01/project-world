const { Router } = require("express");
const userRoute = Router();
const { register, login } = require("../controllers/userContoller");
const { isAuth } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/admin", isAuth, isAdmin);
module.exports = {
  userRoute,
};
