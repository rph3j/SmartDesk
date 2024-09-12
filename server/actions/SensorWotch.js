var sensorLib = require("node-dht-sensor");
const Gpio = require('pigpio').Gpio;
//***********************************************************************************
// file containgi rest of sensors functions
//***********************************************************************************


// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);

// cyclic temperature reading
var app = {
    sensors: [
      {
        name: "Outdoor",
        type: 22,
        pin: 13
      }
    ],
    read: function() {
      for (var sensor in this.sensors) {
        var readout = sensorLib.read(
          this.sensors[sensor].type,
          this.sensors[sensor].pin
        );
        console.log(
          `[${this.sensors[sensor].name}] ` +
            `temperature: ${readout.temperature.toFixed(1)}°C, ` +
            `humidity: ${readout.humidity.toFixed(1)}%`
        );
      }
      setTimeout(function() {
        app.read();
      }, 2000);
    }
  };
   
  app.read();

// servo function to automatically phone holder - not ended, contains only small servo test
const mI = new Gpio(26, {mode: Gpio.OUTPUT});
const mII = new Gpio(19, {mode: Gpio.OUTPUT});

let pulseWidth = 500;
let increment = 2000;

setInterval(() => {
  mI.servoWrite(pulseWidth);
  mII.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2500) {
    increment = -2000;
  } else if (pulseWidth <= 500) {
    increment = 2000;
  }
}, 1000);