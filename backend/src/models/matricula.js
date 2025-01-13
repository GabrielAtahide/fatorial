// src/models/matricula.js
const db = require('../config/db');

// Função para buscar todas as matrículas
const getAllMatriculas = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM matriculas', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para buscar uma matrícula por ID
const getMatriculaById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM matriculas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results[0]);  // Retorna a matrícula ou null
    });
  });
};

// Função para adicionar uma nova matrícula
const addMatricula = (aluno_id, aula_id, status) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO matriculas (aluno_id, aula_id, status) VALUES (?, ?, ?)';
    db.query(query, [aluno_id, aula_id, status], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para atualizar uma matrícula existente
const updateMatricula = (id, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE matriculas SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Função para deletar uma matrícula
const deleteMatricula = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM matriculas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllMatriculas, getMatriculaById, addMatricula, updateMatricula, deleteMatricula };
