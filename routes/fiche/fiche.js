const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')

router.get('/', (req, res) => { if(req.session.key) {
    var current_match_arr = new Array()

    //FIND LE MATCH AVEC LE ObjectId DU URL
    Model.Match.find({_id: new mongo.ObjectId(req.query.id)}, function (err, match) {
        if (err) return console.error(err)

        //FAUT METTRE LE JSON DANS UN ARRAY SINON CA PASSE PAS PAR LE RENDER
        var current_match = new Object()

        current_match.inputEquipHote1= match[0].inputEquipHote1
        current_match.inputEquipVisiteuse1= match[0].inputEquipVisiteuse1
        current_match.inputCegepReceveur1= match[0].inputCegepReceveur1
        current_match.inputCegepVisiteur1= match[0].inputCegepVisiteur1
        //current_match.inputNumeroJoueurReceveur1= match[0].inputNumeroJoueurReceveur1
        //current_match.inputNomJoueurReceveur1= match[0].inputNomPunitionsReceveur1
        //current_match.inputNombrePunitionsReceveur1= match[0].inputNombrePunitionsReceveur1
        //current_match.inputNumeroJoueurReceveur2= match[0].inputNumeroJoueurReceveur2
        //current_match.inputNomJoueurReceveur2= match[0].inputNomJoueurReceveur2
        //current_match.inputNombrePunitionsReceveur2= match[0].inputNombrePunitionsReceveur2
        //current_match.inputNumeroJoueurReceveur3= match[0].inputNumeroJoueurReceveur3
        //current_match.inputNomJoueurReceveur3= match[0].inputNomJoueurReceveur3
        //current_match.inputNombrePunitionsReceveur3= match[0].inputNombrePunitionsReceveur3
        //current_match.inputNumeroJoueurReceveur4= match[0].inputNumeroJoueurReceveur4
        //current_match.inputNomJoueurReceveur4= match[0].inputNomJoueurReceveur4
        //current_match.inputNombrePunitionsReceveur4= match[0].inputNombrePunitionsReceveur4
        //current_match.inputNumeroJoueurReceveur5= match[0].inputNumeroJoueurReceveur5
        //current_match.inputNomJoueurReceveur5= match[0].inputNomJoueurReceveur5
        //current_match.inputNombrePunitionsReceveur5= match[0].inputNombrePunitionsReceveur5
        //current_match.inputNumeroJoueurReceveur6= match[0].inputNumeroJoueurReceveur6
        //current_match.inputNomJoueurReceveur6= match[0].inputNomJoueurReceveur6
        //current_match.inputNombrePunitionsReceveur6= match[0].inputNombrePunitionsReceveur6
        //current_match.inputNumeroJoueurReceveur7= match[0].inputNumeroJoueurReceveur7
        //current_match.inputNomJoueurReceveur7= match[0].inputNomJoueurReceveur7
        //current_match.inputNombrePunitionsReceveur7= match[0].inputNombrePunitionsReceveur7
        //current_match.inputNumeroJoueurReceveur8= match[0].inputNumeroJoueurReceveur8
        //current_match.inputNomJoueurReceveur8= match[0].inputNomJoueurReceveur8
        //current_match.inputNombrePunitionsReceveur8= match[0].inputNombrePunitionsReceveur8
        //current_match.inputEntraineurHote1= match[0].inputEntraineurHote1
        //current_match.inputNumeroJoueurVisiteur1= match[0].inputNumeroJoueurVisiteur1
        //current_match.inputNomJoueurVisiteur1= match[0].inputNomJoueurVisiteur1
        //current_match.inputNombrePunitionsVisiteur1= match[0].inputNombrePunitionsVisiteur1
        //current_match.inputNumeroJoueurVisiteur2= match[0].inputNumeroJoueurVisiteur2
        //current_match.inputNomJoueurVisiteur2= match[0].inputNomJoueurVisiteur2
        //current_match.inputNombrePunitionsVisiteur2= match[0].inputNombrePunitionsVisiteur2
        //current_match.inputNumeroJoueurVisiteur3= match[0].inputNumeroJoueurVisiteur3
        //current_match.inputNomJoueurVisiteur3= match[0].inputNomJoueurVisiteur3
        //current_match.inputNombrePunitionsVisiteur3= match[0].inputNombrePunitionsVisiteur3
        //current_match.inputNumeroJoueurVisiteur4= match[0].inputNumeroJoueurVisiteur4
        //current_match.inputNomJoueurVisiteur4= match[0].inputNomJoueurVisiteur4
        //current_match.inputNombrePunitionsVisiteur4= match[0].inputNombrePunitionsVisiteur4
        //current_match.inputNumeroJoueurVisiteur5= match[0].inputNumeroJoueurVisiteur5
        //current_match.inputNomJoueurVisiteur5= match[0].inputNomJoueurVisiteur5
        //current_match.inputNombrePunitionsVisiteur5= match[0].inputNombrePunitionsVisiteur5
        //current_match.inputNumeroJoueurVisiteur6= match[0].inputNumeroJoueurVisiteur6
        //current_match.inputNomJoueurVisiteur6= match[0].inputNomJoueurVisiteur6
        //current_match.inputNombrePunitionsVisiteur6= match[0].inputNombrePunitionsVisiteur6
        //current_match.inputNumeroJoueurVisiteur7= match[0].inputNumeroJoueurVisiteur7
        //current_match.inputNomJoueurVisiteur7= match[0].inputNomJoueurVisiteur7
        //current_match.inputNombrePunitionsVisiteur7= match[0].inputNombrePunitionsVisiteur7
        //current_match.inputNumeroJoueurVisiteur8= match[0].inputNumeroJoueurVisiteur8
        //current_match.inputNomJoueurVisiteur8= match[0].inputNomJoueurVisiteur8
        //current_match.inputNombrePunitionsVisiteur8= match[0].inputNombrePunitionsVisiteur8
        //current_match.inputEntraineurVisiteur1= match[0].inputEntraineurVisiteur1
        current_match.inputPointageEquipeHote1= match[0].inputPointageEquipeHote1
        current_match.inputPointageEquipeVisiteuse1= match[0].inputPointageEquipeVisiteuse1
        current_match.inputEquipeGagnante1= match[0].inputEquipeGagnante1

        current_match_arr.push(current_match)
        res.render('fiche', {user_name: req.session.key["user_name"], test: current_match_arr })
    })
}
else
{
    res.redirect('/')
}
})

module.exports = router
