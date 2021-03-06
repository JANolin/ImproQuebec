const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')
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
    const nouvelleEquipe = new Model.Equipe({
        inputNomEquipe: req.body.inputNomEquipe,
        inputNumeroJoueur1: req.body.inputNumeroJoueur1,
        inputNomJoueur1: req.body.inputNomJoueur1,
        inputNumeroJoueur2: req.body.inputNumeroJoueur2,
        inputNomJoueur2: req.body.inputNomJoueur2,
        inputNumeroJoueur3: req.body.inputNumeroJoueur3,
        inputNomJoueur3: req.body.inputNomJoueur3,
        inputNumeroJoueur4: req.body.inputNumeroJoueur4,
        inputNomJoueur4: req.body.inputNomJoueur4,
        inputNumeroJoueur5: req.body.inputNumeroJoueur5,
        inputNomJoueur5: req.body.inputNomJoueur5,
        inputNumeroJoueur6: req.body.inputNumeroJoueur6,
        inputNomJoueur6: req.body.inputNomJoueur6,
        inputNumeroJoueur7: req.body.inputNumeroJoueur7,
        inputNomJoueur7: req.body.inputNomJoueur7,
        inputNumeroJoueur8: req.body.inputNumeroJoueur8,
        inputNomJoueur8: req.body.inputNomJoueur8,
        inputNomEntraineur: req.body.inputNombreEntraineur,
    })

    nouvelleEquipe.save()

    res.redirect('/equipes')
})

module.exports = router
