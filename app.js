const express = require('express');
const app = express();

const rotaVotos = require('./class/votos');
const rotaVetor = require('./class/vetor');

app.use('/votos', rotaVotos);
app.use('/vetor', rotaVetor);

app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok!'
    });
});

module.exports = app;