const db = require('../config/db'); // Importando a conexão com o banco
const bcrypt = require('bcryptjs'); // Usando bcryptjs para criptografia
const jwt = require('jsonwebtoken'); // Para criação do token JWT

// Função para buscar um usuário pelo email
const findOne = (email) => {
  // Garantir que o email seja uma string
  if (typeof email === 'object' && email !== null && email.where && typeof email.where.email === 'string') {
    email = email.where.email;
  } else if (typeof email !== 'string') {
    console.error('findOne - O email deve ser uma string. Valor recebido:', email);
    return Promise.reject(new Error('Formato inválido de email.'));
  }

  return new Promise((resolve, reject) => {
    console.log('findOne - Email recebido:', email);
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.execute(query, [email], (err, results) => {
      console.log('findOne - Resultados da consulta:', results);
      if (err) {
        console.error("Erro no banco de dados:", err);
        return reject(err);
      }

      if (!results || results.length === 0) {
        console.warn("findOne - Usuário não encontrado para o email:", email);
        return reject(new Error("Usuário não encontrado"));
      }

      console.log('findOne - Usuário encontrado:', results[0]);
      resolve(results[0]);
    });
  });
};

// Função para adicionar um novo usuário
const addUsuario = (nome, email, senha, tipo) => {
  return new Promise((resolve, reject) => {
    console.log('Entrando na função addUsuario');
    if (tipo !== 'aluno' && tipo !== 'professor') {
      console.warn('Tipo inválido:', tipo);
      reject(new Error('Tipo inválido. O tipo deve ser "aluno" ou "professor".'));
      return;
    }

    console.log('Antes de criptografar a senha:', senha);
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erro ao criptografar a senha:', err);
        reject(err);
        return;
      }

      console.log('Senha criptografada:', hashedPassword);
      const queryUsuario = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
      db.query(queryUsuario, [nome, email, hashedPassword, tipo], (err, result) => {
        if (err) {
          console.error('Erro ao adicionar usuário no banco:', err);
          return reject(err);
        }

        if (tipo === 'professor') {
          const usuarioId = result.insertId;
          const queryProfessor = 'INSERT INTO professores (id) VALUES (?)';
          db.query(queryProfessor, [usuarioId], (err, professorResult) => {
            if (err) {
              console.error('Erro ao adicionar professor no banco:', err);
              return reject(err);
            }
            console.log('Professor adicionado com sucesso:', professorResult);
            resolve(professorResult);
          });
        } else {
          console.log('Usuário adicionado com sucesso:', result);
          resolve(result);
        }
      });
    });
  });
};

// Função para buscar todos os usuários
const getAllUsuarios = () => {
  return new Promise((resolve, reject) => {
    console.log('Executando busca por todos os usuários.');
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        reject(err);
      }
      console.log('Usuários encontrados:', results);
      resolve(results);
    });
  });
};

// Função para buscar um usuário pelo ID
const getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    console.log('Buscando usuário pelo ID:', id);
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário pelo ID:', err);
        reject(err);
      }
      console.log('Usuário encontrado pelo ID:', results[0]);
      resolve(results[0]);
    });
  });
};

// Função para atualizar um usuário
const updateUsuario = (id, nome, email, senha, tipo) => {
  return new Promise((resolve, reject) => {
    console.log('Atualizando usuário com ID:', id);
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erro ao criptografar senha:', err);
        return reject(err);
      }

      const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?';
      db.query(query, [nome, email, hashedPassword, tipo, id], (err, results) => {
        if (err) {
          console.error('Erro ao atualizar usuário:', err);
          reject(err);
        }
        console.log('Usuário atualizado com sucesso:', results);
        resolve(results);
      });
    });
  });
};

// Função para deletar um usuário
const deleteUsuario = (id) => {
  return new Promise((resolve, reject) => {
    console.log('Deletando usuário com ID:', id);
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao deletar usuário:', err);
        reject(err);
      }
      console.log('Usuário deletado com sucesso:', results);
      resolve(results);
    });
  });
};

// Função para login de usuário
const loginUsuario = (email, senha) => {
  return new Promise((resolve, reject) => {
    console.log('loginUsuario - Email recebido para login:', email);

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      console.log('loginUsuario - Resultados da consulta:', results);
      if (err) {
        console.error('Erro na consulta ao banco de dados:', err);
        return reject(err);
      }

      const usuario = results[0];

      if (!usuario) {
        console.warn('loginUsuario - Usuário não encontrado para o email:', email);
        return reject(new Error('Usuário não encontrado.'));
      }

      console.log('loginUsuario - Comparando senha fornecida com a do banco...');
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

      if (!isPasswordValid) {
        console.warn('loginUsuario - Senha incorreta para o email:', email);
        return reject(new Error('Senha incorreta.'));
      }

      console.log('loginUsuario - Senha válida, gerando token JWT...');
      const token = jwt.sign(
        { userId: usuario.id, email: usuario.email, tipo: usuario.tipo },
        process.env.JWT_SECRET, // Sua chave secreta
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      console.log('loginUsuario - Token gerado com sucesso:', token);
      resolve(token);
    });
  });
};

module.exports = { getAllUsuarios, addUsuario, findOne, getUsuarioById, updateUsuario, loginUsuario, deleteUsuario };
