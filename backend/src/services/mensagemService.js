// src/services/mensagemService.js
const mensagemModel = require('../models/mensagem');

// Função para obter todas as mensagens
const getAllMensagens = () => {
  return mensagemModel.getAllMensagens();
};

// Função para enviar uma nova mensagem
const addMensagem = (remetenteId, destinatarioId, conteudo, aulaId) => {
  return mensagemModel.addMensagem(remetenteId, destinatarioId, conteudo, aulaId);
};

// Função para obter as mensagens de uma aula
const getMensagensByAula = (aulaId) => {
  return mensagemModel.getMensagensByAula(aulaId);
};

module.exports = { getAllMensagens, addMensagem, getMensagensByAula };
console.log(module.exports);  
