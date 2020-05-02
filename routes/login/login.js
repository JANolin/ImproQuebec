const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {

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
                //
                
                //TODO CHANGER CA ET LE ELSE. CA UTILISE LANCIEN SYSTEM, QUAND
                //ON DEVAIT PASSER A LA MAIN LE NOM DE LA RESSOURCE A renderWithPerms
                //MAIS MAINTENANT ON A MIGRER VERS normalRendering(), ET ON A PAS
                //BESOIN DE PASSER LA RSC, MAIS I GUESS QUIL VA FALLOIR TROUVER
                //UNE SOLUTION POUR CE GENRE DE CAS FUCKEs
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
