// src/models/mensagem.js
const db = require('../config/db');

// Função para buscar todas as mensagens
const getAllMensagens = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM mensagens', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para buscar mensagens por destinatário
const getMensagensByDestinatario = (destinatario_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM mensagens WHERE destinatario_id = ?';
    db.query(query, [destinatario_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para adicionar uma nova mensagem
const addMensagem = (remetente_id, destinatario_id, conteudo, data_envio) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo, data_envio) VALUES (?, ?, ?, ?)';
    db.query(query, [remetente_id, destinatario_id, conteudo, data_envio], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para deletar uma mensagem
const deleteMensagem = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM mensagens WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllMensagens, getMensagensByDestinatario, addMensagem, deleteMensagem };
