// mongoose to mongodb connection
const mongoose = require('mongoose');

// .env acess
require('dotenv').config();

// connecting to Atlas
const connectionStr = process.env.MONGODB_URI;
mongoose.connect(connectionStr);

// mongoDB success
mongoose.connection.on('connected', ()=>{console.log('connected')});
// mongoDB error
mongoose.connection.on('error',(error)=>{console.log('error')});
// mongoDB disconnect
mongoose.connection.on('disconnected',()=>{console.log('disconnected')});