const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotaVotos = require('./class/votos');
const rotaVetor = require('./class/vetor');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/votos', rotaVotos);
app.use('/vetor', rotaVetor);

app.get("/", function(req, res, next){
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/fatorial", function(req, res, next){
    res.sendFile(__dirname + "/html/fatorial.html");
});

app.post("/busca-fatorial", function(req, res, next){

    function Fatorial(n){
        var resultado = n;
        for(var i = 1; i < n; i++){
            resultado = resultado * i;
        }
        return resultado;
    }

    res.send("O fatorial de " + req.body.valor + " é: " + Fatorial(req.body.valor));
});

module.exports = app;