const express = require('express')
const router = express.Router()

router.get('/surveys', (req, res) => {
    res.send('survey data')
})

module.exports = router