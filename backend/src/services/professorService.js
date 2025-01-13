// src/services/professorService.js
const professorModel = require('../models/professor');

// Função para obter todos os professores
const getAllProfessores = () => {
  return professorModel.getAllProfessores();
};

// Função para adicionar um novo professor
const addProfessor = (nome, email, senha, especialidade) => {
  return professorModel.addProfessor(nome, email, senha, especialidade);
};

// Função para buscar um professor por ID
const getProfessorById = (id) => {
  return professorModel.getProfessorById(id);
};

// Função para atualizar um professor
const updateProfessor = (id, nome, email, senha, especialidade) => {
  return professorModel.updateProfessor(id, nome, email, senha, especialidade);
};

// Função para deletar um professor
const deleteProfessor = (id) => {
  return professorModel.deleteProfessor(id);
};

module.exports = { getAllProfessores, addProfessor, getProfessorById, updateProfessor, deleteProfessor };
console.log(module.exports);  
