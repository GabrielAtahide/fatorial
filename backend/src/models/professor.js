const db = require('../config/db'); // Conexão com o banco de dados
const bcrypt = require('bcryptjs');

// Função para buscar todos os professores com ID par
const getAllProfessores = (req, res) => {
  db.query('SELECT * FROM professores WHERE MOD(id, 2) = 0', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Função para adicionar um novo professor
const addProfessor = (req, res) => {
  const { nome, email, senha, especialidade } = req.body;

  // Criptografar a senha antes de inserir no banco
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criptografar a senha.' });
    }

    // Inserir o usuário na tabela 'usuarios' com a senha criptografada
    const queryUsuario = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    db.query(queryUsuario, [nome, email, hashedPassword, 'professor'], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      let usuarioId = result.insertId;  // ID do usuário gerado automaticamente

      // Garantir que o ID seja par para o professor
      if (usuarioId % 2 !== 0) {
        usuarioId += 1;  // Se o ID for ímpar, aumenta para tornar par
      }

      // Atualiza o ID do usuário para garantir que seja par
      const updateQuery = 'UPDATE usuarios SET id = ? WHERE id = ?';
      db.query(updateQuery, [usuarioId, result.insertId], (err, updateResult) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Agora insere o professor na tabela 'professores' com o ID ajustado
        const queryProfessor = 'INSERT INTO professores (id, especialidade) VALUES (?, ?)';
        db.query(queryProfessor, [usuarioId, especialidade], (err, professorResult) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: 'Professor adicionado com sucesso!', result: professorResult });
        });
      });
    });
  });
};

// Função para buscar um professor pelo ID
const getProfessorById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM professores WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(results[0]);
  });
};

// Função para atualizar um professor
const updateProfessor = (req, res) => {
  const { nome, email, senha, especialidade } = req.body;
  const id = req.params.id;
  const query = 'UPDATE professores SET nome = ?, email = ?, senha = ?, especialidade = ? WHERE id = ?';
  
  db.query(query, [nome, email, senha, especialidade, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json({ message: 'Professor atualizado com sucesso!' });
  });
};

// Função para deletar um professor
const deleteProfessor = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM professores WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json({ message: 'Professor deletado com sucesso!' });
  });
};

module.exports = {
  getAllProfessores,
  addProfessor,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
};
