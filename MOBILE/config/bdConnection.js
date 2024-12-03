require('dotenv').config(); // Carrega as variáveis do .env
const { Sequelize } = require('sequelize');

// Use as variáveis de ambiente do .env
const usuario = process.env.DB_USERNAME;
const senha = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const nmBanco = process.env.DB_DBNAME;

// Configuração do Sequelize
const conexaoSequelize = new Sequelize(
    `mysql://${usuario}:${senha}@${host}:3306/${nmBanco}`
);

module.exports = {
    nmBanco,
    conexaoSequelize,
};
