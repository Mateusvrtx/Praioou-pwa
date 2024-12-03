const { Sequelize } = require('sequelize');
require('dotenv').config();  // Isso carrega as variáveis de ambiente do arquivo .env

const conexaoSequelize = new Sequelize(
  process.env.DB_DBNAME,      // Nome do banco de dados
  process.env.DB_USERNAME,    // Nome de usuário
  process.env.DB_PASSWORD,    // Senha
  {
    host: process.env.DB_HOST, // Host do banco
    port: process.env.DB_PORT || 3306, // Porta (caso não seja especificado, assume 3306)
    dialect: 'mysql',          // Dialeto MySQL
    logging: false,            // Desativa logs SQL, se desejar
  }
);

module.exports = {
  conexaoSequelize,
};
