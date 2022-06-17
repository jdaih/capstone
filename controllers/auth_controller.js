const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require('../models');

// Login Route
router.get('/login', (req,res) => {
        res.render('auth/login')
});

router.post('/', async (req,res, next) => {
    try{
        const foundUser = await User.findOne({email: req.body.email});
        const passMatch = await bcrypt.compare(req.body.password, foundUser.password);
        if (!passMatch) return alert('Password or Username Invalid');
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };
        return res.redirect('/')
    } catch(error){
        console.log(error)
        req.error = error;
        return next();
    }
})

// Register Route
router.get('/register', (req,res) => {
        res.render('auth/register')
}); 

router.post('/register', async (req,res, next) => {
    try {
        const foundUser = await User.exists({email: req.body.email})
        if (foundUser) {
            res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await User.create(req.body);
        return res.redirect('/login')
    } catch(error){
        console.log(error)
        req.error = error;
        return next();
    }
})

// logout route
router.get('/logout', async (req,res)=> {
    try{
        await req.session.destroy();
        return res.redirect('/');
    } catch (error){
        console.log(error);
        return res._construct.send(error);
    }
})



module.exports = router;