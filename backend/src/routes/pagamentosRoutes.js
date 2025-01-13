// src/routes/pagamentosRoutes.js
const express = require('express');
const router = express.Router();
const pagamentos = require('../models/pagamento');

// Definindo as rotas
router.get('/', pagamentos.getAllPagamentos);
router.get('/:id', pagamentos.getPagamentoById);
router.post('/', pagamentos.addPagamento);
router.put('/:id', pagamentos.updatePagamento);
router.delete('/:id', pagamentos.deletePagamento);

module.exports = router;
console.log(module.exports);  
