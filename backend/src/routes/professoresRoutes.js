// src/routes/professoresRoutes.js
const express = require('express');
const router = express.Router();
const professores = require('../models/professor');

// Definindo as rotas para os professores
router.get('/', professores.getAllProfessores);
router.post('/', professores.addProfessor);
router.get('/:id', professores.getProfessorById);
router.put('/:id', professores.updateProfessor);
router.delete('/:id', professores.deleteProfessor);

module.exports = router;
console.log(module.exports);  
