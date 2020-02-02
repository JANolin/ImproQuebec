const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('match')
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.redirect('/match')
})

module.exports = router
