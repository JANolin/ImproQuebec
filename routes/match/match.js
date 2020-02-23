const express = require('express')
const router = express.Router()
const Model = require('../../models/models')

router.get('/', (req, res) => {
    res.render('match')
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
})

router.post('/', (req, res) => {
    const matchReport = new Model.Match({
        inputEquipHote1: req.body.inputEquipHote1,
        inputEquipVisiteuse1: req.body.inputEquipVisiteuse1,
        inputCegepReceveur1: req.body.inputCegepReceveur1,
        inputCegepVisiteur1: req.body.inputCegepVisiteur1,
        inputNumeroJoueurReceveur1: req.body.inputNumeroJoueurReceveur1,
        inputNomJoueurReceveur1: '',
        inputNombrePunitionsReceveur1: '',
        inputNumeroJoueurReceveur2: '',
        inputNomJoueurReceveur2: '',
        inputNombrePunitionsReceveur2: '',
        inputNumeroJoueurReceveur3: '',
        inputNomJoueurReceveur3: '',
        inputNombrePunitionsReceveur3: '',
        inputNumeroJoueurReceveur4: '',
        inputNomJoueurReceveur4: '',
        inputNombrePunitionsReceveur4: '',
        inputNumeroJoueurReceveur5: '',
        inputNomJoueurReceveur5: '',
        inputNombrePunitionsReceveur5: '',
        inputNumeroJoueurReceveur6: '',
        inputNomJoueurReceveur6: '',
        inputNombrePunitionsReceveur6: '',
        inputNumeroJoueurReceveur7: '',
        inputNomJoueurReceveur7: '',
        inputNombrePunitionsReceveur7: '',
        inputNumeroJoueurReceveur8: '',
        inputNomJoueurReceveur8: '',
        inputNombrePunitionsReceveur8: '',
        inputEntraineurHote1: '',
        inputNumeroJoueurVisiteur1: '',
        inputNomJoueurVisiteur1: '',
        inputNombrePunitionsVisiteur1: '',
        inputNumeroJoueurVisiteur2: '',
        inputNomJoueurVisiteur2: '',
        inputNombrePunitionsVisiteur2: '',
        inputNumeroJoueurVisiteur3: '',
        inputNomJoueurVisiteur3: '',
        inputNombrePunitionsVisiteur3: '',
        inputNumeroJoueurVisiteur4: '',
        inputNomJoueurVisiteur4: '',
        inputNombrePunitionsVisiteur4: '',
        inputNumeroJoueurVisiteur5: '',
        inputNomJoueurVisiteur5: '',
        inputNombrePunitionsVisiteur5: '',
        inputNumeroJoueurVisiteur6: '',
        inputNomJoueurVisiteur6: '',
        inputNombrePunitionsVisiteur6: '',
        inputNumeroJoueurVisiteur7: '',
        inputNomJoueurVisiteur7: '',
        inputNombrePunitionsVisiteur7: '',
        inputNumeroJoueurVisiteur8: '',
        inputNomJoueurVisiteur8: '',
        inputNombrePunitionsVisiteur8: '',
        inputEntraineurVisiteur1: '',
        inputPointageEquipeHote1: req.body.inputPointageEquipeHote1,
        inputPointageEquipeVisiteuse1: req.body.inputPointageEquipeVisiteuse1,
        inputEquipeGagnante1: req.body.inputEquipeGagnante1
    })

    matchReport.save().then(() => console.log("DB: $MATCH$ INFOS SAVED"))

    console.log(req.body)
    res.redirect('/match')
})

module.exports = router
