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
            res.json({success: "success"});
            break;
        }
        case "setupGPIO": {
            activePorts[req.body.port] = new GPIO(req.body.port, ...req.body.args);
            res.json({success: "success"});
            break;
        }
        case "executeGPIOCommand": {
            const result = activePorts[req.body.port][req.body.commandName](...req.body.args);
            if (req.body.doReturnResult) {
                res.json({success: "success", result: result});
                return;
            }
            res.json({success: "success"});
            break;
        }
    }
});

app.listen(3000, () => {});