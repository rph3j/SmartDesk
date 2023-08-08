const { response } = require("express");

const sensor = require("node-dht-sensor").promises;
const GPIO = require('onoff').Gpio;

var LED = new GPIO(4, 'out');

var R = new GPIO(18, 'out');
var G = new GPIO(12, 'out');
var B = new GPIO(13, 'out');

let Red = 0;
let Green = 0;
let Blue = 0;

let ifManual = true;
let ifActivated = true;

// ==========================================================================================================
// Plik z metodami odpowiedzialnymi za wywolanie odpowiednich endPointów słóżoących do zarządzania GPIO RasPi
// ==========================================================================================================

class RasPiAction {

    async On(req, res){
        if(ifManual)
        {
            await LED.writeSync(1);
            console.log('On');
        }
        res.status(200).send();
    } 
    async Off(req, res){
        if(ifManual)
        {
            await LED.writeSync(0);
            console.log('off');
        }
        res.status(200).send();
    } 
    LedOff(req, res){
        if(ifManual)
        {
            R.writeSync(0);
            G.writeSync(0);
            B.writeSync(0);
        }
        res.status(200).send();
    }
    RGB(req,res){

        Red = parseInt(req.body.Red);
        Green = parseInt(req.body.Green);
        Blue = parseInt(req.body.Blue);

        if(ifActivated)
        {
            R.writeSync(Red);
            G.writeSync(Green);
            B.writeSync(Blue);
            //console.log(Red);
        }
        res.status(201).json();
    }

    turnOnOffLight(onORoff){
        if(ifManual == false){
            if(onORoff){
                LED.writeSync(1);
                R.writeSync(Red);
                G.writeSync(Green);
                B.writeSync(Blue);
                ifActivated = true;
            }else{
                LED.writeSync(0);
                R.writeSync(0);
                G.writeSync(0);
                B.writeSync(0);
                ifActivated = false;
            }
        }
    }

    changeMode(req, res){
        if(ifManual)
        {
            ifActivated = false;
        }else{
            ifActivated = true;
        }
        ifManual = !ifManual;
        R.writeSync(0);
        G.writeSync(0);
        B.writeSync(0);
        LED.writeSync(0);
        res.status(200).send();
    }

    async DHT22(req, res) {
        try {
          const result = await sensor.read(22, 6);
          //console.log(result);
          res.status(200).send(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
      }
}

module.exports = new RasPiAction()