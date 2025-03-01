require("dotenv").config();
const mysql = require("mysql2");

// Configuração do banco de dados MySQL no Azure
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Nome do servidor no Azure
  user: process.env.DB_USER, // Usuário administrador
  password: process.env.DB_PASS, // Senha do banco
  database: process.env.DB_NAME, // Nome do banco de dados
  ssl: {
    rejectUnauthorized: true, // Importante para conexões seguras no Azure
  },
});

// Promisify para suportar async/await
const promisePool = pool.promise();

module.exports = promisePool;
