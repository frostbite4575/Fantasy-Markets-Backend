// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const {
  runCycle,
  getCycles,
  getCycle
} = require('../controllers/cycleController');

router.post('/run', runCycle);
router.get('/', getCycles);
router.get('/:id', getCycle);

module.exports = router;