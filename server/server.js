// =================================================================
// main project file
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