const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {

    utils.goIfUserAllowed('access', req, res, 
        //go
        (rsc)=> {
            //TODO Passer un message pour dire que bien deco
            req.session.destroy(()=> {
                res.redirect('/')
            })
        },
        //back
        (err)=> {
            //TODO Redirect vers une page erreur 403
            //faire ca partout quand la promise fail
            console.log('na pas acces a la resource car: ' + err)
            res.redirect('/')
        })
})

module.exports = router
