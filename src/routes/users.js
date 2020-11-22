const express = require('express')
const router = express.Router()

router.get('/users/signup', (req, res) => {
    res.send('Registro')
})

router.get('/users/signin', (req, res) => {
    res.send('Login')
})

module.exports = router