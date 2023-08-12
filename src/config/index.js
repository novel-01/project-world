require("dotenv/config");

const config = {
  port: process.env.PORT || 3000,
  jwt_key: process.env.Jwt_Secret_Key
};
module.exports = config;
