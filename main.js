const onoff = require("onoff");
const GPIO = onoff.Gpio;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const activePorts = {};

app.post("/api/update", bodyParser.json(), (req, res) => {
    switch(req.body.type) {
        case "reset": {
            Object.keys(activePorts).forEach(key => {
                const gpio = activePorts[key];
                gpio.unexport();
            })
            activePorts = [];
            break;
        }
        case "setupGPIO": {
            activePorts[req.body.port] = new GPIO(req.body.port, ...req.body.args);
            break;
        }
        case "executeGPIOCommand": {
            activePorts[req.body.port][req.body.commandName](...req.body.args);
            break;
        }
    }
});

app.listen(3000, () => {});