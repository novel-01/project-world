const { userRoute } = require("./userRoute");
const { serviceRoute } = require("./serviceRoute");
const { feedbackRoute } = require("./feedbackRoute");
const { contactRoute } = require("./contactRoute");

module.exports = [
  userRoute,
  serviceRoute,
  feedbackRoute,
  contactRoute,
];
