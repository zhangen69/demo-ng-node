const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/demo_db', { useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB!'); })
    .catch(() => { console.log('Connection failed!'); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include product model
const Product = require('./models/product');

// mockup api
// POST
app.post('/api/product', (req, res, next) => {
    const product = new Product(req.body);
    product.save().then(result => {
        res.status(201).json({
            message: 'Product created successfully!',
            product: result
        });
    }).catch(error => {
        res.status(500).json({ message: 'Product failed to create!', error: error.toString() });
    });
});
// GET
app.get('/api/product/:id', (req, res, next) => {
    Product.findById(req.params.id).then(result => {
        if (result == null) throw new Error("Product not found!");

        res.status(200).json({ 
            message: 'Product fetched successfully!', 
            result: result 
        });
    }).catch(error => {
        res.status(500).json({ message: 'Product not found!', error: error.toString() });
    });
});
// PUT
app.put('/api/product/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }).then(result => {
        if (result == null) throw new Error("Product not found!");
        
        res.status(200).json({
            message: 'Product updated successfully!',
            product: result
        })
    }).catch(error => {
        res.status(500).json({ message: 'Product failed to update!', error: error.toString() });
    });
});
// DELETE
app.delete('/api/product/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(result => {
        if (result == null) throw new Error("Product not found!");

        res.status(200).json({ message: 'Product deleted successfully!' });
    }).catch(error => {
        res.status(500).json({ message: 'Product failed to delete!', error: error.toString() });
    });
});
// mockup api

module.exports = app;
