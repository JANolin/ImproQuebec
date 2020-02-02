const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({id:3, name:'chien'});
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
})

module.exports = router
