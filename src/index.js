require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Desacoplando servidor http para que a aplicação ouça tanto o protocolo http quanto o web socket
const server = require('http').Server(app);

// Suporte ao socket - Protocolo socket não é suportado por padrão pelo protocolo http
const io = require('socket.io')(server);

//process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});

// Middleware incluindo o io no req
app.use((req, res, next) => {
    req.io = io;
    next(); // Segue execução
});

// Log das requisições
app.use(morgan("dev"));

// Libera acesso para endereços diferentes da hospedagem do backend
app.use(cors());

// Rota para o browser acessar os arquivos de upload/resized
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Rotas
app.use(require('./routes'));

// executar no terminal\>yarn dev (ver package.json)
server.listen(process.env.PORT || 3333, () => {
    console.log('Server started on port 3333!')
});


//app.listen(app.get('PORT'), app.get('HOST'), () => {
//    console.log(`Express started at http://${app.get('HOST')}:${app.get('PORT')} ENV ${app.get('NODE_ENV')}`)
//});

