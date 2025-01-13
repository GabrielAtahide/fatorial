// src/models/aula.js
const db = require('../config/db');

// Função para buscar todas as aulas
const getAllAulas = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM aulas', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para buscar uma aula por ID
const getAulaById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM aulas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results[0]);  // Retorna a aula ou null
    });
  });
};

// Função para adicionar uma nova aula
const addAula = (titulo, descricao, data, hora, professor_id) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO aulas (titulo, descricao, data, hora, professor_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [titulo, descricao, data, hora, professor_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para atualizar uma aula existente
const updateAula = (id, titulo, descricao, data, hora) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE aulas SET titulo = ?, descricao = ?, data = ?, hora = ? WHERE id = ?';
    db.query(query, [titulo, descricao, data, hora, id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para deletar uma aula
const deleteAula = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM aulas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllAulas, getAulaById, addAula, updateAula, deleteAula };
