const express = require('express');
const router = express.Router();
const RasPiActions = require('../actions/RasPi.js');
const dbActions = require('../actions/dbActions.js');

// =================================================================
// Plik z endPointami API urzywany przez główny plik servera
// =================================================================

// ENDPOINTY

//DB
router.get('/timeData', dbActions.getData)
router.get('/todayData', dbActions.getTodayData)
router.delete('/clearTable', dbActions.clearTable)
// Przycisk włącz wyłącz.

router.get('/On', RasPiActions.On)
router.get('/Off', RasPiActions.Off)
router.post('/RGB', RasPiActions.RGB)
router.get('/LedOff', RasPiActions.LedOff)
router.get('/switchMode', RasPiActions.changeMode)
router.get('/DHT22', RasPiActions.DHT22)



module.exports = router;