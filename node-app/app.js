const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const productRoutes = require('./routes/product');
const productServiceRoutes = require('./servicesRoutes/product');

// initialize app
const app = express();

// mongodb connection
mongoose
    .connect('mongodb://localhost:27017/demo_db', { useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB!'); })
    .catch(() => { console.log('Connection failed!'); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', productRoutes);
app.use('/service', productServiceRoutes);

module.exports = app;
