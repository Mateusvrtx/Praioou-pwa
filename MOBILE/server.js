const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const { conexaoSequelize, nmBanco } = require('./config/bdConnection');
const path = require('path');
const routes = require('./src/routes/index');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

global.__basedir = __dirname;

app.use(cors());

conexaoSequelize.authenticate().then(() => {
    console.log(`>>> Conexão com o banco ${nmBanco} estabelecida com sucesso!`);
}).catch(erroConn => {
    console.log(`>>> Erro ao conectar-se ao banco ${nmBanco}`);
    console.log(erroConn);
});

global.ambulantes = [];

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'resources/static/assets/uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./src/views/'));

//Manifest do PWA
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use('/', routes);

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('registerAmbulante', (ambulanteId) => {
        global.ambulantes[ambulanteId] = socket.id;
        console.log(`Ambulante ${ambulanteId} registrado com socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
        for (let ambulanteId in global.ambulantes) {
            if (global.ambulantes[ambulanteId] === socket.id) {
                delete global.ambulantes[ambulanteId];
                break;
            }
        }
        console.log('Cliente desconectado:', socket.id);
    });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const porta = 3000;
server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
