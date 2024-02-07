const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dashBoardRoute = require("./Routes/dashBoardRoute");
const productsRoute = require("./Routes/productsRoute");
const locationsRoute = require("./Routes/locationsRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = 7000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/",dashBoardRoute);
//app.use("/api/user",RouterPath);
app.use("/products", productsRoute);
app.use("/locations", locationsRoute);


app.use(errorHandler);
app.listen(port, ()=>console.log("Server running on port 7000"));