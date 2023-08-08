// =================================================================
// Głwny plik servera to tu się wszstko zaczyna
// server jest utowrzony za pomocą biblioteki express
// cors - użyty by dane mogły byc przesłana pomiędzy portami na których działa server i frontend
// =================================================================

const express = require('express');
var bodyParser = require('body-parser')
const { port } = require('./Config.js');

const cors = require('cors');

const server = express();
const apiRouter = require('./routers/api.js');
require('./actions/distanceSensorWatch.js');


// urzycie cors'a
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));

// urzycie routów z api
server.use('/api/', apiRouter);

// start servera
server.listen(port, () => {
    console.log("Server listen on port: " + port);
})