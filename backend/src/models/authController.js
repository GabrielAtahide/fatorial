const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Ajuste conforme a configuração do seu banco

const SECRET_KEY = process.env.JWT_SECRET || 'minha_chave_secreta';

exports.login = async (req, res) => {
  const { email, senha, tipo } = req.body;
  console.log('Requisição recebida:', req.body); // Log para ver o que está sendo enviado no corpo da requisição

  try {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [user] = await db.execute(query, [email]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = user[0];
    console.log('Usuário encontrado no banco:', usuario); // Log para ver o usuário retornado pelo banco

    if (usuario.tipo !== tipo) {
      console.log(`Tipo de usuário não corresponde: Esperado ${tipo}, mas encontrado ${usuario.tipo}`); // Log para verificar os tipos
      return res.status(403).json({ message: 'Tipo de usuário inválido para as credenciais fornecidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    if (usuario.tipo === 'professor' && !usuario.aprovado) {
      return res.status(403).json({ message: 'Acesso negado. Professor ainda não validado.' });
    }

    // Gerando o token
    const token = jwt.sign(
      { 
        userId: usuario.id, 
        email: usuario.email, 
        tipo: usuario.tipo, 
        aprovado: usuario.aprovado // Incluindo a informação de aprovação
      },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    console.log('Token gerado:', token); // Log para verificar o token gerado

    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

