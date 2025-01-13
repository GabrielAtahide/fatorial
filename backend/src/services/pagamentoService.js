// src/services/pagamentoService.js
const pagamentoModel = require('../models/pagamento');

// Função para obter todos os pagamentos
const getAllPagamentos = () => {
  return pagamentoModel.getAllPagamentos();
};

// Função para registrar um pagamento
const addPagamento = (alunoId, valor, dataPagamento) => {
  return pagamentoModel.addPagamento(alunoId, valor, dataPagamento);
};

// Função para obter um pagamento específico
const getPagamentoById = (id) => {
  return pagamentoModel.getPagamentoById(id);
};

// Função para deletar um pagamento
const deletePagamento = (id) => {
  return pagamentoModel.deletePagamento(id);
};

module.exports = { getAllPagamentos, addPagamento, getPagamentoById, deletePagamento };
console.log(module.exports);  
