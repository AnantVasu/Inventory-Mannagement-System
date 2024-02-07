const express = require("express");
const Router = express.Router();
const getDashBoardData = require("../controllers/dashBoardController");


Router.get("/", getDashBoardData);

module.exports = Router;