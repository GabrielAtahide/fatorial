// src/routes/mensagensRoutes.js
const express = require('express');
const router = express.Router();
const mensagens = require('../models/mensagem');

// Definindo as rotas
router.get('/', mensagens.getAllMensagens);
router.get('/:destinatario_id', mensagens.getMensagensByDestinatario);
router.post('/', mensagens.addMensagem);
router.delete('/:id', mensagens.deleteMensagem);

module.exports = router;
console.log(module.exports);

