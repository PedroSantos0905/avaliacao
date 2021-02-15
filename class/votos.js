const express = require('express'); 
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        X = 100;
        total_eleitores = 1000;
        validos = 800;
        brancos = 150;
        nulos = 50;

        res.status(201).send({
            'Percentual de votos válidos': validos / total_eleitores * X + '%',
            'Percentual de votos brancos': brancos / total_eleitores * X + '%',
            'Percentual de votos nulos': nulos / total_eleitores * X + '%'
        });
    
        console.log('Percentual de votos válidos: ' + validos / total_eleitores * X + '%');
        console.log('Percentual de votos brancos: ' + brancos / total_eleitores * X + '%');
        console.log('Percentual de votos nulos: ' + nulos / total_eleitores * X + '%');
    
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;