// Require
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const controllers = require('./controllers')

// Database
const db = require('./models');

// Port
const PORT = process.env.PORT

// instance
const app = express();

// db connection
require('./config/db.connection')

app.use(cors())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.status(200).send('Hello World'));


// Create Server
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`);})