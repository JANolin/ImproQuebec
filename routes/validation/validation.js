const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {
    console.log(req.query.caca)

    utils.goIfUserAllowed("access", req, res,
        //go
        ()=>{
            utils.normalRendering(req, res)
        },
        //back
        ()=>{
            res.redirect('/')
        })
})

module.exports = router
