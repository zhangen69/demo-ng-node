const express = require('express');
const Controller = require('../controllers/standard.controller');
const ProductService = new Controller('product');
const StandardRoutes = require('./standard.routes');
const router = new StandardRoutes(express.Router(), 'product', ProductService);

module.exports = router;