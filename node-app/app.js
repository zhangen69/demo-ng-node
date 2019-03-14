const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsreport = require('jsreport');
const mailer = require('express-mailer');
const emailConfig = require('./configs/email.config.json');

// import routes
const productRoutes = require('./routes/product.routes');

// initialize app
const app = express();

// initialize jsreport
jsreport().init();

// setup mailer settings
mailer.extend(app, emailConfig);

// Views
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

// mongodb connection
mongoose
    .connect('mongodb://localhost:27017/demo_db', { useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB!'); })
    .catch(() => { console.log('Connection failed!'); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/service', productRoutes);
app.get('/test', (req, res, next) => {
    const Product = require('./models/product.model');
    const conditions = { 'name': /test/gi, 'price': { '$lte': 5000, '$gte': 0 }, '$and': [ { 'price': { '$gte': 0 } }, { 'price': { '$gte': 2000 }}]};
    // console.log(conditions);
    Product.find(conditions, null, { skip: 0, limit: 10}).then(data => {
        res.json(data);
    })
})
app.get('/report', (req, res, next) => {
    jsreport.render({
        template: {
            content: '<h1>Hello {{foo}}</h1>',
            engine: 'handlebars',
            recipe: 'chrome-pdf'
        },
          data: {
            foo: "world"
        }
    }).then(data => {
        data.stream.pipe(res);
    })
})
app.get('/sendEmail', (req, res, next) => {
    app.mailer.send('email', {
        to: 'zhangen69@live.co.uk',
        subject: 'testing email',

    }, (error, message) => {
        if (error) {
            console.log(error);
            res.status(500).send('There was an error sending the email');
            return;
        }
        res.status(200).json({ message: 'Email sent' });
    });
})

module.exports = app;
