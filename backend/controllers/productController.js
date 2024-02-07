const express = require("express");
const sqlDbConnect = require("../dbConnect");

const getAllProducts = async (req, res) => {
    sqlDbConnect.query("select * from Products", (err, rows)=>{
        if(!err){
            res.send(rows.recordset);
        }else {
            console.log(err);
        }
    });
}

const getProduct = async (req, res) => {
    sqlDbConnect.query("select * from Products where id='"+req.params.id+"'", (err, rows)=>{
        if(!err){
            res.send(rows.recordset);
        }else {
            console.log(err);
        }
    });
}

const addNewProduct = async (req, res) => {
    const { productName, category, quantity, currentLocation, status, price } = req.body;
    const convertedPrice = parseInt(price);
    const convertedQuantity = parseInt(quantity);
    const value = quantity * price;

    if( !productName || !category || !quantity || !currentLocation || !status || !price) {
        res.status(400);
        throw new Error("Please fill in all the details");
    }

    var sql = "Insert into Products (ProductName, Category, Quantity, CurrentLocation, Status, Price, Value) Values('"+productName+"','"+category+"', '"+convertedQuantity+"','"+currentLocation+"','"+status+"', '"+convertedPrice+"', '"+value+"')";

    sqlDbConnect.query(sql, (err, rows)=>{
        if(!err){
            res.status(200).json("Product added successfully!");
        }else {
            console.log(err);
        }
    });
}

const updateProduct = async (req, res) => {
    const { productName, category, quantity, currentLocation, status, price } = req.body;
    const value = quantity*price;

    var sql = "update Products Set ProductName = '"+productName+"', Category =  '"+category+"', Quantity = '"+quantity+"', CurrentLocation = '"+currentLocation+"', Status = '"+status+"', Price = '"+price+"', Value = '"+value+"' where id = '"+req.params.id+"'";

    sqlDbConnect.query(sql, (err, rows)=>{
        if(!err){
            res.status(200).json("Product updated successfully!");
        }else {
            console.log(err);
        }
    });
}

const deleteProduct = async (req,res) => {
    sqlDbConnect.query("delete from Products where id='"+req.params.id+"'", (err, rows)=>{
        if(!err){
            res.status(200).json("Product deleted successfully!");
        }else {
            console.log(err);
        }
    });
}

module.exports = {
    getAllProducts,
    addNewProduct,
    getProduct,
    updateProduct,
    deleteProduct
};