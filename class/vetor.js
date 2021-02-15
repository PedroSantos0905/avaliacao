const express = require('express'); 
const router = express.Router();

router.get('/', (req, res, next) => {
    try {

desordenado = '[5,3,2,4,7,1,0,6]';        

var a = [5, 3, 2, 4, 7, 1, 0, 6];

function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

bubbleSort(a);

console.log('Vetor desordenado:' + desordenado);
console.log('Vetor ordenado: [' + a + '];');

res.status(201).send({
    'Vetor desordenado': desordenado,
    'Vetor ordenado': a
});
    
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;