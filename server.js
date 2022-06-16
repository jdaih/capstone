// Require
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors')
// const controllers = require('./controllers');

// Database
// const db = require('./models');

// Port
const PORT = process.env.PORT || 8000

// instance
const app = express();

// db connection
require('./config/db.connection')
require('dotenv').config();

// app configs
app.set('view engine', 'ejs')


// adding delete and update requests
// app.use(methodOverride('_method'))
// app.use(express.urlencoded({ extended: false }));


// app.use(function (req, res, next) {
//     res.locals.user = req.session.currentUser;
//     next();
// })

// CONTROLLERS
// app.use('/products', controllers.products);
// app.use('/login', controllers.users);
// app.use('/cart', controllers.cart);

// // Home Page
// app.get('/', async (req,res, next) => { 
//     try { 
//         const products = await db.Product.find({})
//         const context = {products}
//         res.render('index.ejs', context);
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// })

app.get('/', (req, res) => res.status(200).send('Hello World'));


// Create Server
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`);})