const express = require("express");
const sqlDbConnect = require("./dbConnect");
const Router = express.Router();

Router.get("/",(req,res) => {
    const userData = [{name:"Anant", email:"anantsinghal9gmail.com"},
                    {name:"Bob Marley", email:"bob@marley.com"}
                    ];
    res.send(userData);
});

Router.get("/api/user", (req,res)=>{
    sqlDbConnect.query("select * from test_userTable", (err, rows)=>{
        if(!err){
            res.send(rows.recordsets);
        }else {
            console.log(err);
        }
    });
});



module.exports = Router;