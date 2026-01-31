// routes/worldRoutes.js
const express = require('express');
const router = express.Router();
const {
  generateWorld,
  getWorlds,
  getWorld,
  deleteWorld
} = require('../controllers/worldController');

router.post('/generate', generateWorld);
router.get('/', getWorlds);
router.get('/:id', getWorld);
router.delete('/:id', deleteWorld);

module.exports = router;