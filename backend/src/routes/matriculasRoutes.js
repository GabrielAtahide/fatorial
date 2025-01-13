// src/routes/matriculasRoutes.js
const express = require('express');
const router = express.Router();
const matriculas= require('../models/matricula');

// Definindo as rotas
router.get('/', matriculas.getAllMatriculas);
router.get('/:id', matriculas.getMatriculaById);
router.post('/', matriculas.addMatricula);
router.put('/:id', matriculas.updateMatricula);
router.delete('/:id', matriculas.deleteMatricula);

module.exports = router;
console.log(module.exports);  
