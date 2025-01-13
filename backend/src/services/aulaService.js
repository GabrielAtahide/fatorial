// src/services/aulaService.js
const aulaModel = require('../models/aula');

// Função para obter todas as aulas
const getAllAulas = () => {
  return aulaModel.getAllAulas();
};

// Função para adicionar uma nova aula
const addAula = (titulo, descricao, professorId) => {
  return aulaModel.addAula(titulo, descricao, professorId);
};

// Função para obter uma aula específica
const getAulaById = (id) => {
  return aulaModel.getAulaById(id);
};

// Função para atualizar uma aula
const updateAula = (id, titulo, descricao, professorId) => {
  return aulaModel.updateAula(id, titulo, descricao, professorId);
};

// Função para deletar uma aula
const deleteAula = (id) => {
  return aulaModel.deleteAula(id);
};

module.exports = { getAllAulas, addAula, getAulaById, updateAula, deleteAula };
console.log(module.exports);  
