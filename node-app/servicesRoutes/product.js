const express = require('express');
const service = require('../controllers/serviceController');

const ProductService = new service('product');
const router = express.Router();

const resHandling = (res, func) => {
    func.then(result => {
        res.status(result.status).json(result);
    }).catch(result => {
        res.status(result.status).json(result);
    });
}

router.post('/product', (req, res, next) => {
    resHandling(res, ProductService.create(req.params.id));
});

router.get('/product/:id', (req, res, next) => {
    resHandling(res, ProductService.fetch(req.params.id));
})

router.get('/product', (req, res, next) => {
    resHandling(res, ProductService.fetchAll(req.params.id));
})

router.put('/product/:id', (req, res, next) => {
    resHandling(res, ProductService.update(req.body));
})

router.delete('/product/:id', (req, res, next) => {
    resHandling(res, ProductService.delete(req.params.id));
})

module.exports = router;