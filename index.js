'use strict'

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

const logger = require('morgan');

const mongojs = require('mongojs');

var db = mongojs("SD");

let elementoId = req.params.id;
let elementoData = req.body;

app.param("coleccion", (req, res, next, coleccion) => {
    req.collection = db.collection(coleccion);
    return next();
});

app.get('/hola/:unNombre', (req, res) => {
    res.status(200).send({mensaje: `Hola ${req.params.unNombre} desde SD!`});
});

//Declarar middlewares
app.use(logger('dev'));
//app.use(express.urlencoded());
app.use(express.json());

//Declarar las rutas del servicio, junto con sus controladores y logica de negocio
app.get('/api/product', getProductsController);

function getProductsController (req, res) {
    //Aqui va la logica de negocio
    //ahora se simula la base de datos, que no hay

    res.status(200).send({
        msg: 'Ahí va la tabla productos',
        productos: []
    });
}

//Lo siguiente equivale al app y function de justo arriba
app.get('/api/product/:productID', (req, res) => {
    const id = req.params.productID;
    //Aqui va la logica de negocio

    res.status(200).send({
        msg: `Ahí va el producto ${id} solicitado`,
        producto: id
    })
});

app.post('/api/product', (req, res) => {
    const miNuevoProducto = req.body;

    console.log(miNuevoProducto);
    //Aqui va la logica de negocio
    res.status(200).send({
        msg: 'He creado el nuevo producto',
        producto: miNuevoProducto
    });
});
//una vez creado esto hemos pasado a postman
//ponia undefined en la terminal y no salia en postman, por eso se ha puesto la linea de use(express.json())

app.put('/api/product/:productID', (req, res) => {
    const id = req.params.productID;
    const cambios = req.body;

    //Aqui va la logica de negocio
    res.status(200).send({
        msg: `He actualizado el producto ${id}`,
        producto: id,
        cambios: cambios
    })
});

app.delete('/api/product/:productID', (req, res) => {
    const id = req.params.productID;

    //Aqui va la logica de negocio
    res.status(200).send({
        msg: `He eliminado el producto ${id}`,
        producto: id
    })
});

//Lanzamos el servicio

//para que pueda cambiar con el $ hay que poner las comillas de al lado de la letra p en el teclado
app.listen(port, () => {
    console.log(`API REST ejecutándose en http://localhost:${port}/api/product`);
});