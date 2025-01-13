// src/routes/aulasRoutes.js
const express = require('express');
const router = express.Router();
const aulas = require('../models/aula');

// Definindo as rotas
router.get('/', aulas.getAllAulas);
router.get('/:id', aulas.getAulaById);
router.post('/', aulas.addAula);
router.put('/:id', aulas.updateAula);
router.delete('/:id', aulas.deleteAula);

module.exports = router;
console.log(module.exports);  
