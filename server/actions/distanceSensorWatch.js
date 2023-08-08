const Gpio = require('pigpio').Gpio;
const RasPi = require('./RasPi.js');
const DB = require('../actions/dbActions');

//***********************************************
// funkcja wywoływana po 5 minutach po odejściu od biurka. w przypadku powrotu liczy czas dalej.
//***********************************************
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

//***********************************************
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius -- z biblioteki i wskazuwek dotyczących urzywania sesnora
//***********************************************
const MICROSECDONDS_PER_CM = 1e6/34321;

//***********************************************
// definicja pinów
//***********************************************
const trigger = new Gpio(24, {mode: Gpio.OUTPUT});
const echo = new Gpio(23, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

//***********************************************
// zmienne
//***********************************************
let setStart; // czas początkowy
let nearDesk = false; // wartość bool sygnalizująca czy znajduje się przy biurku
let ifBreak = false; // wartość bool sygnalisująca czy nie jest przypadkie mywoływana funkcja savrTime
let distance; // zapisywana wartość dystansu.

//***********************************************
// Głowna funkcja
//***********************************************
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

//***********************************************
// jestem przy biurku rozpoczynam liczenie czasu.
//***********************************************
      if(distance < 20 && !nearDesk && !ifBreak)
      {
          const date = new Date();
          console.log('start');
          setStart = date.getTime();
          nearDesk = true;
          RasPi.turnOnOffLight(true);
      }
//***********************************************
// odsuwam się od biurka - morże timer na 5m, jeślio nadal nie ma mnie przy biurku to  -> koniczę liczenie czasu, zapisuje wynik do bazy, 
//***********************************************
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

//***********************************************
// Trigger słurzący do mierzania dystansu
//***********************************************
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);