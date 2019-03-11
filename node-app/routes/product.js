const express = require('express');
const service = require('../controllers/serviceController');
const Product = require('../models/product');
const router = express.Router();


// POST
router.post('/product', (req, res, next) => {
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
router.get('/product/:id', (req, res, next) => {
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
router.put('/product/:id', (req, res, next) => {
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
router.delete('/product/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(result => {
        if (result == null) throw new Error("Product not found!");

        res.status(200).json({ message: 'Product deleted successfully!' });
    }).catch(error => {
        res.status(500).json({ message: 'Product failed to delete!', error: error.toString() });
    });
});

module.exports = router;
