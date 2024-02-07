const express = require("express");
const Router = express.Router();
const { getAllProducts, addNewProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");

Router.get("/all", getAllProducts);
Router.get("/:id", getProduct);
Router.post("/addProduct", addNewProduct);
Router.put("/:id", updateProduct);
Router.delete("/:id", deleteProduct);

module.exports = Router;