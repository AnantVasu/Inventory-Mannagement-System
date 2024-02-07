const express = require("express");
const sqlDbConnect = require("../dbConnect");

const getAllLocations = async (req, res) => {
    sqlDbConnect.query("select * from Locations", (err, rows)=>{
        if(!err){
            res.send(rows.recordset);
        }else {
            console.log(err);
        }
    });
}


const addNewLocation = async (req, res) => {
    const { city, state, locationType } = req.body;

    if( !city || !state || !locationType) {
        res.status(400);
        throw new Error("Please fill in all the details");
    }

    var sql = "Insert into Locations (City, State, LocationType) Values('"+city+"','"+state+"', '"+locationType+"')";

    sqlDbConnect.query(sql, (err, rows)=>{
        if(!err){
            res.status(200).json("Location added successfully!");
        }else {
            console.log(err);
        }
    });
}


const updateLocation = async (req, res) => {
    const { city, state, locationType } = req.body;

    var sql = "update Locations Set City = '"+city+"', State =  '"+state+"', LocationType = '"+locationType+"' where Id = '"+req.params.id+"'";

    sqlDbConnect.query(sql, (err, rows)=>{
        if(!err){
            res.status(200).json("Location updated successfully!");
        }else {
            console.log(err);
        }
    });
}

const deleteLocation = async (req,res) => {
    sqlDbConnect.query("delete from Locations where Id='"+req.params.id+"'", (err, rows)=>{
        if(!err){
            res.status(200).json("Location deleted successfully!");
        }else {
            console.log(err);
        }
    });
}

module.exports = {
    getAllLocations,
    addNewLocation,
    updateLocation,
    deleteLocation,
}