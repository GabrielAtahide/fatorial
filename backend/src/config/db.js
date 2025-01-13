const mysql = require('mysql2');

// Caso o banco de dados esteja em um host remoto ou outra configuração de pasta
const connection = mysql.createConnection({
  host: 'localhost',  // IP ou domínio do servidor onde o MySQL está rodando
  user: 'root',               // Seu nome de usuário MySQL
  password: 'root',             // Sua senha do MySQL
  database: 'fatorial_bd'        // Nome do seu banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = connection;
