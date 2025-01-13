const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario'); // Certifique-se de que o modelo 'User' está correto
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha, tipo } = req.body;

  // Log para verificar o que está sendo recebido na requisição
  console.log('Dados recebidos:', { email, senha, tipo });

  // Verificar se os campos são do tipo string
  if (typeof email !== 'string' || typeof senha !== 'string' || typeof tipo !== 'string') {
    return res.status(400).json({ message: 'Os campos email, senha e tipo devem ser strings' });
  }

  try {
    // Corrigindo a busca do usuário
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    if (user.tipo !== tipo) {
      return res.status(403).json({ message: 'Tipo de usuário inválido para as credenciais fornecidas.' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    if (user.tipo === 'professor' && !user.aprovado) {
      return res.status(403).json({ message: 'Acesso negado. O professor ainda não foi aprovado.' });
    }

    // Criando o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, tipo: user.tipo, aprovado: user.aprovado },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respondendo com o token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;

