const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')

router.get('/', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
