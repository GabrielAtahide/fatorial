const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuario');

// Middleware para registrar requisições
router.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// Rota para login de usuário
router.post('/login', (req, res) => {
  const { email, senha, tipo } = req.body;

  console.log('Dados recebidos:', { email, senha, tipo });

  // Aqui, você pode usar esses valores para autenticar o usuário
  usuarioModel.findOne(email)  // Passando apenas o email, como string
    .then(usuario => {
      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }

      // Validar a senha
      if (usuario.senha === senha) {
        const token = 'seuTokenAqui';  // Exemplo de token (pode ser gerado com uma biblioteca como JWT)
        return res.status(200).json({ token });
      } else {
        return res.status(401).send('Senha incorreta');
      }
    })
    .catch(err => {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).send('Erro interno no servidor');
    });
});



// Rota para adicionar um novo usuário
router.post('/', (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  usuarioModel.addUsuario(nome, email, senha, tipo)
    .then((result) => {
      res.status(201).json({ message: 'Usuário adicionado com sucesso', result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao adicionar usuário', error: err });
    });
});

// Rota para obter todos os usuários
router.get('/', (req, res) => {
  usuarioModel.getAllUsuarios()
    .then((usuarios) => {
      res.status(200).json(usuarios);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    });
});

// Rota para obter um usuário pelo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  usuarioModel.getUsuarioById(id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
    });
});

// Rota para atualizar um usuário
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, email, senha, tipo } = req.body;

  usuarioModel.updateUsuario(id, nome, email, senha, tipo)
    .then((result) => {
      res.status(200).json({ message: 'Usuário atualizado com sucesso', result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
    });
});

// Rota para deletar um usuário
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  usuarioModel.deleteUsuario(id)
    .then((result) => {
      res.status(200).json({ message: 'Usuário deletado com sucesso', result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
    });
});

module.exports = router;
