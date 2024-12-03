require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./src/routes/index');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configuração básica do servidor
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'resources/static/assets/uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Configuração do Manifest PWA
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// Rotas
app.use('/', routes);

// Configuração do EJS
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Porta configurável com fallback
const porta = process.env.PORT || 3000;
server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
