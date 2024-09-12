const Gpio = require('pigpio').Gpio;
const RasPi = require('./RasPi.js');
const DB = require('../actions/dbActions');


// *******************************************************************************************
// the file contains a function for the distance sensor
//********************************************************************************************


// function called 5 minutes after leaving the desk. in case of return, he continues to count the time.
function saveTime() 
{
  if(distance > 20)
  {
    const date = new Date();
    console.log('stop 2');
    let timeS = date.getTime() - setStart;
    DB.postData(timeS);
    RasPi.turnOnOffLight(false);
  }
  else{
    console.log('I back');
    nearDesk = true;
  }
  ifBreak = false;
}


// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(24, {mode: Gpio.OUTPUT});
const echo = new Gpio(23, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

let setStart; // starting time
let nearDesk = false; // a bool value indicating whether he is at the desk
let ifBreak = false; // a bool value indicating whether the savrTime function is accidentally called
let distance; // recorded distance value.

// main function - from tutorial
const watchHCSR04 = () => {
  let startTick;
  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      //console.log(diff / 2 / MICROSECDONDS_PER_CM);
      distance = diff / 2 / MICROSECDONDS_PER_CM;


// I start counting the time spent at my desk
      if(distance < 20 && !nearDesk && !ifBreak)
      {
          const date = new Date();
          console.log('start');
          setStart = date.getTime();
          nearDesk = true;
          RasPi.turnOnOffLight(true);
      }
// I move away from the desk - the timer starts at 5m, if I'm still not at the desk, then -> I finish counting the time, save the result to the database!
      if(distance >= 20 && nearDesk)
      {
        nearDesk = false;
        ifBreak = true;
        setTimeout(saveTime, 10000);
        console.log('stop 1');
      }
    }
  });
};

watchHCSR04();

// Trigger
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);