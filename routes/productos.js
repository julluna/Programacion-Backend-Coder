const router = require('express').Router();
const Productos = require('../classProducto.js');

router.get('/productos', (req, res) => {
    res.send(Productos.productos);
});

router.get('/productos/:id', (req, res) => {
    let producto = Productos.productos.find(producto => producto.id === Number(req.params.id));
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.post('/productos', (req, res) => {
    let { title, price, thumbnail } = req.body;
    const producto = { title, price, thumbnail };
    producto.id = Productos.productos.length + 1;
    Productos.productos.push(producto);
    res.send(Productos.productos);
});

router.put('/productos/:id', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let index = Productos.productos.findIndex(producto => producto.id === Number(req.params.id));
    if (index >= 0) {
        Productos.productos[index] = { title, price, thumbnail };
        Productos.productos[index].id = Number(req.params.id);
        res.send(Productos.productos[index]);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', (req, res) => {
    let index = Productos.productos.findIndex(producto => producto.id === Number(req.params.id));
    if (index >= 0) {
        Productos.productos.splice(index, 1);
        res.send({ message: 'Producto eliminado' });
    } else {
        res.status(404).send({ error: 'producto no encontrado' });
    }
})

module.exports = router;