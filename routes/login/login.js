const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {

    utils.goIfUserAllowed("access", req, res,
        //go
        (rsc)=>{
            utils.renderWithPerms(req, res, rsc)
        },
        //back
        (err)=>{
            console.log('na pas acces a la resource car: ' + err)
            res.redirect('/')
        })
})

router.post('/', (req, res) => {
    handler_db.handle_database_login(req, (response) => {
        //SI LA REQUETE A PLANTE/ LE COMPTE EXISTE PAS
        if(response === null) {
            //res.redirect('/')
            //res.render('login', {error :{invalid_creds : true} })
            utils.renderWithPerms(req, res, 'login', {invalid_creds : true})

        } else {
            //SI SON COMPTE EXISTE PAS
            if(!response) {
                //res.redirect('/')
                //res.render('login', {error :{invalid_creds : true} })
                utils.renderWithPerms(req, res, 'login', {invalid_creds : true})

                //SI SON COMPTE EXISTE
            } else {
                req.session.key = response;
                res.redirect('/accueil')
            }
        }
    });
})

module.exports = router
