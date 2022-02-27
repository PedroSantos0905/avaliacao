const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const rotaVotos = require('./class/votos');
const rotaVetor = require('./class/vetor');
require("dotenv").config();

var connection=mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
});

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/votos', rotaVotos);
app.use('/vetor', rotaVetor);

app.get('/',(req, res) => {
        let sql = 'SELECT id_veiculo, nm_veiculo,nm_marca,ano,descricao, case when vendido = 1 then "Sim" else "Não" end as vendido,created,updated FROM tb_veiculo';
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

app.post('/cadastrar',(req, res) => { 
    let data = {nm_veiculo: req.body.nome, nm_marca: req.body.marca, ano: req.body.ano, descricao: req.body.descricao, vendido: req.body.vendido};
    let sql = "INSERT INTO tb_veiculo SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/editar/:id_veiculo',(req, res) => {
    const id_veiculo = req.params.id_veiculo;
    let sql = `SELECT id_veiculo, nm_veiculo,nm_marca,ano,descricao, case when vendido = 1 then "Sim" else "Não" end as vendido,created,updated FROM tb_veiculo where id_veiculo = ${id_veiculo}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('vei_edit', {
            title : 'CRUD de Veículos',
            veiculo : result[0]
        });
    });
});

app.post('/atualizar',(req, res) => {
    const id_veiculo = req.body.id_veiculo;
    let sql = "update tb_veiculo SET nm_veiculo='"+req.body.nome+"',  nm_marca='"+req.body.marca+"',  ano='"+req.body.ano+"', descricao='"+req.body.descricao+"', vendido='"+req.body.vendido+"', updated=now() where id_veiculo ="+id_veiculo;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/excluir/:id_veiculo',(req, res) => {
    const id_veiculo = req.params.id_veiculo;
    let sql = `DELETE FROM tb_veiculo where id_veiculo = ${id_veiculo}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/nao-vendido',(req, res) => {
    let sql = 'SELECT id_veiculo, nm_veiculo,nm_marca,ano,descricao, case when vendido = 1 then "Sim" else "Não" end as vendido,created,updated FROM tb_veiculo where vendido = 0';
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_nao-vendido', {
        title : 'CRUD de Veículos',
        veiculos : rows
        });
    });
});

app.get('/nao-vendido',(req, res) => {
    res.render('vei_nao-vendido', {
        title : 'CRUD de Veículos' 
    });
});

app.get('/add-ult-semana',(req, res) => {
    let sql = 'SELECT id_veiculo, nm_veiculo,nm_marca,ano,descricao, case when vendido = 1 then "Sim" else "Não" end as vendido,created,updated FROM tb_veiculo WHERE created BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()';
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_add-ult-semana', {
        title : 'CRUD de Veículos',
        veiculos : rows
        });
    });
});

app.get('/add-ult-semana',(req, res) => {
    res.render('vei_add-ult-semana', {
        title : 'CRUD de Veículos' 
    });
});

app.get('/vei-por-decada-2020',(req, res) => {
    const decada_ini = 2020;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-2010',(req, res) => {
    const decada_ini = 2010;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-2000',(req, res) => {
    const decada_ini = 2000;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-1990',(req, res) => {
    const decada_ini = 1990;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-1980',(req, res) => {
    const decada_ini = 1980;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-1970',(req, res) => {
    const decada_ini = 1970;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada-1960',(req, res) => {
    const decada_ini = 1960;
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where ano >= ${decada_ini} and ano <= ${decada_ini} + 9`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-decada', {
        title : 'CRUD de Veículos',
        decadaAtual : decada_ini,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-ch',(req, res) => {
    const nm_marca = "Chevrolet";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-to',(req, res) => {
    const nm_marca = "Toyota";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-vo',(req, res) => {
    const nm_marca = "Volkswagen";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-fo',(req, res) => {
    const nm_marca = "Ford";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-ho',(req, res) => {
    const nm_marca = "Honda";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-bm',(req, res) => {
    const nm_marca = "BMW";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-ni',(req, res) => {
    const nm_marca = "Nissan";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-hy',(req, res) => {
    const nm_marca = "Hyundai";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-ki',(req, res) => {
    const nm_marca = "Kia";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-marca-me',(req, res) => {
    const nm_marca = "Mercedes-Benz";
    let sql = `SELECT id_veiculo, nm_veiculo, nm_marca, ano, descricao, case when vendido = 1 then "Sim" else "Não" end as vendido, created, updated FROM tb_veiculo where nm_marca = '${nm_marca}'`;
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('vei_por-marca', {
        title : 'CRUD de Veículos',
        marcaAtual : nm_marca,
        veiculos : rows
        });
    });
});

app.get('/vei-por-decada',(req, res) => {
    res.render('vei_por-decada', {
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