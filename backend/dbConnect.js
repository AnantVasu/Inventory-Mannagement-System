const sql = require("mssql/msnodesqlv8");

const sqlconnect = new sql.ConnectionPool({
    server:"DESKTOP-FM7M6Q3\\SQLEXPRESS",
    database:"InventoryManagementSystem",
    driver: 'msnodesqlv8',
    multipleStatements: true,
    options: {
        trustedConnection: true,
        multipleStatements: true,
    }
});

sqlconnect.connect((err)=>{
    if(!err){
        console.log("Database connected!");
    }else{
        console.log("Database not connected!");
    }
} );

module.exports = sqlconnect;