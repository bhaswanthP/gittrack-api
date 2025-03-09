require("dotenv").config();

module.exports = {
  GITHUB_API_BASE: "https://api.github.com",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME
};
