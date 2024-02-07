const express = require("express");
const sqlDbConnect = require("../dbConnect");

queryPromise1 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT ProductName) as totalProducts from Products", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);  
                resolve(productsData);          
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise2 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select SUM(ALL Value) as totalStoreValue from Products", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);
                resolve(productsData);   
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise3 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(Quantity) as outOfStockCount from Products where Quantity = 0", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise4 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT Category) as allCategories from Products", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise5 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT Id) as totalLocations from Locations", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise6 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT City) as totalCities from Locations", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise7 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT State) as totalStates from Locations", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}

queryPromise8 = (productsData) => {
    return new Promise((resolve, reject)=>{
        sqlDbConnect.query("select Count(DISTINCT LocationType) as totalLocationTypes from Locations", (err, rows)=>{
            if(!err){
                productsData.push(rows.recordset[0]);   
                resolve(productsData);            
            }else {
                console.log(err);
                reject(err);
            }
        });
    });
}



const getDashBoardData = async (req, res) => {
    const productsData = [];

    await queryPromise1(productsData);
    await queryPromise2(productsData);
    await queryPromise3(productsData);
    await queryPromise4(productsData);
    await queryPromise5(productsData);
    await queryPromise6(productsData);
    await queryPromise7(productsData);
    await queryPromise8(productsData);

    res.send(productsData);    
}

module.exports = getDashBoardData;