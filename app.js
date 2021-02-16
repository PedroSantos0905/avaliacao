const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const rotaVotos = require('./class/votos');
const rotaVetor = require('./class/vetor');
require("dotenv").config();

const connection=mysql.createConnection({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  });

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
  }); 

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/votos', rotaVotos);
app.use('/vetor', rotaVetor);

app.get('/',(req, res) => {
        let sql = 'SELECT nm_veiculo,nm_marca,ano,descricao, case when vendido = 1 then "Sim" else "Não" end as vendido,created,updated FROM tb_veiculo';
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('vei_index', {
            title : 'CRUD de Veículos',
            veiculos : rows
        });
    });
});

app.get('/cadastrar-vei',(req, res) => {
    res.render('vei_add', {
        title : 'CRUD de Veículos'
    });
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

app.get("/multiplos", function(req, res, next){
    res.sendFile(__dirname + "/html/multiplos.html");
});

app.post("/busca-soma", function(req, res, next){

     x = 3;
     z = 5;
     resSoma = 0;
    
    for(i = 0; i < req.body.valor; i++){
        if(i % x == 0 || i % z == 0){
            resSoma += i;
        }
    }

    res.send("A soma dos multiplos de 3 ou 5 até " + req.body.valor + " é: " + resSoma);
});

module.exports = app;