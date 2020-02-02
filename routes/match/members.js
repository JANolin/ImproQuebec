const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("VOICI LA FEUILLE DE MATCH")
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
})

module.exports = router
