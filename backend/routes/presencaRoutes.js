const express = require('express');
const router = express.Router();
const PresencaController = require('../controllers/PresencaController');

// POST /api/presencas
router.post('/', PresencaController.create);

// GET /api/presencas
router.get('/', PresencaController.getAll);

module.exports = router;
