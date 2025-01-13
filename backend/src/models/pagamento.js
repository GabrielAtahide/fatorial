// src/models/pagamento.js
const db = require('../config/db');

// Função para buscar todos os pagamentos
const getAllPagamentos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM pagamentos', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para buscar um pagamento por ID
const getPagamentoById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pagamentos WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results[0]);  // Retorna o pagamento ou null
    });
  });
};

// Função para adicionar um novo pagamento
const addPagamento = (matricula_id, valor, status, data_pagamento) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pagamentos (matricula_id, valor, status, data_pagamento) VALUES (?, ?, ?, ?)';
    db.query(query, [matricula_id, valor, status, data_pagamento], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para atualizar o status do pagamento
const updatePagamento = (id, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pagamentos SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para deletar um pagamento
const deletePagamento = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pagamentos WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllPagamentos, getPagamentoById, addPagamento, updatePagamento, deletePagamento };
