const express = require("express");
const Router = express.Router();
const { getAllLocations, addNewLocation, updateLocation, deleteLocation } = require("../controllers/locationController");

Router.get("/all", getAllLocations);
// Router.get("/:id", getProduct);
Router.post("/addLocation", addNewLocation);
Router.put("/:id", updateLocation);
Router.delete("/:id", deleteLocation);

module.exports = Router;