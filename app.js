const express = require('express');
const app = express();

const rotaVotos = require('./class/votos');

app.use('/votos', rotaVotos);

app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok!'
    });
});

module.exports = app;