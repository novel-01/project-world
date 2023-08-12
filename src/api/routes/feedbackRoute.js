const { Router } = require("express");
const feedbackRoute = Router();
const { isAdmin } = require("../middlewares/adminMiddleware");
const {
  getAllFeedbacks,
  getOneFeedback,
  deleteFeedback,
  addFeedback,
  updateFeedback,
} = require("../controllers/feedbackController");

const { isAuth } = require("../middlewares/authMiddleware");
feedbackRoute.get("/feedbacks", isAuth, getAllFeedbacks);
feedbackRoute.get("/feedbacks/:id", isAuth, getOneFeedback);
feedbackRoute.delete("/feedbacks/:id", isAuth, isAdmin, deleteFeedback);
feedbackRoute.post("/feedback", isAuth, addFeedback);
feedbackRoute.put("/feedbacks/:id", isAuth, isAdmin, updateFeedback);
module.exports = {
  feedbackRoute,
};
