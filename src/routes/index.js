const { request } = require('express')
const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', async (req, res) => {
    const { user, jobs} = req.body
    const API_USER = `https://torre.bio/api/bios/${user}`
    const response = await fetch(API_USER)
    const data = await response.json()
    res.redirect('/surveys')
    
})

module.exports = router
