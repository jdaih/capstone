// Require
const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')
const MongoStore = require("connect-mongo")

// Database
const db = require('./models');

// Instance
const app = express()

// Port
const PORT = process.env.PORT

// db connection
require('./config/db.connection')
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// session creation
app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
})

// Controllers
app.use("/", controllers.auth);

// Home route
app.get("/", (req, res) => res.send("Hello World"));


app.listen(PORT, () => {console.log(`Listening on port ${PORT}`);})