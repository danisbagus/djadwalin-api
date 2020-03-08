const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

module.exports = app;
