// src/services/matriculaService.js
const matriculaModel = require('../models/matricula');

// Função para obter todas as matrículas
const getAllMatriculas = () => {
  return matriculaModel.getAllMatriculas();
};

// Função para matricular um aluno em uma aula
const addMatricula = (alunoId, aulaId) => {
  return matriculaModel.addMatricula(alunoId, aulaId);
};

// Função para obter a matrícula de um aluno
const getMatriculaByAluno = (alunoId) => {
  return matriculaModel.getMatriculaByAluno(alunoId);
};

// Função para deletar uma matrícula
const deleteMatricula = (id) => {
  return matriculaModel.deleteMatricula(id);
};

module.exports = { getAllMatriculas, addMatricula, getMatriculaByAluno, deleteMatricula };
console.log(module.exports);  
