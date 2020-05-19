const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')
const utils = require('../../utils/utils')

router.get('/', (req, res) => { 
    utils.goIfUserAllowed("access", req, res,
        //go
        ()=>{
            getEquipe(req).then((data)=>{
                utils.normalRendering(req, res, {data : data})
            })
        },
        //back
        ()=>{
            res.redirect('/')
        })
})

async function getEquipe(req)
{
    var current_equipe_arr = []
    return current_equipe_arr
}

module.exports = router
