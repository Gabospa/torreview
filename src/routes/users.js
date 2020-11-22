const express = require('express')
const router = express.Router()

const User = require('../models/User')

const passport = require('passport')

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const { username, email, password, confirm_password } = req.body
    const errors = []
    if (username.length <= 0 || email.length <= 0 ) {
        errors.push({text: 'Please fill all the fields'})
    }
    if (password != confirm_password) {
        errors.push({text: "Passwords don't match"})
    }
    if (password.length < 5) {
        errors.push({text: 'Password must have 5 or more characters'})
    }
    const emailUser = await User.findOne({email: email})
    if (emailUser){
        errors.push({text: 'Email is already taken. Please use new one'})
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, username, email, password, confirm_password})
    } else {
        const newUser = new User({ username, email, password})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'Register Succesfull')
        res.redirect('/users/signin')
    }
})

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/surveys',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

module.exports = router