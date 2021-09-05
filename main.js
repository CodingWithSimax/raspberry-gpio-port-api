const onoff = require("onoff");
const GPIO = onoff.Gpio;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.post("/api/update", bodyParser.json(), (req, res) => {
    console.log("got request: ", req.body);
});

app.listen(3000, () => {});