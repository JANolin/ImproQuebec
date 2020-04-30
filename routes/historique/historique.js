const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const utils = require('../../utils/utils')

router.get('/', (req, res) => { 
    utils.goIfUserAllowed('access', req, res, 
        //go
        (rsc)=> {
            let match = getHistorique()
            utils.renderWithPerms(req, res, rsc, match)
        },
        //back
        (err)=> {
            res.redirect('/')
        })
})

function getHistorique()
{
        Model.Match.find(function (err, match) {
            if (err) return console.error(err)
            var all_history = new Array()

            for(let i = 0; i < match.length; i++)
            {
                let current_match = new Object()
                current_match.inputEquipHote1= match[i].inputEquipHote1
                current_match.inputEquipVisiteuse1= match[i].inputEquipVisiteuse1
                //current_match.inputCegepReceveur1= match[i].inputCegepReceveur1
                //current_match.inputCegepVisiteur1= match[i].inputCegepVisiteur1
                //current_match.inputNumeroJoueurReceveur1= match[i].inputNumeroJoueurReceveur1
                //current_match.inputNomJoueurReceveur1= match[i].inputNomPunitionsReceveur1
                //current_match.inputNombrePunitionsReceveur1= match[i].inputNombrePunitionsReceveur1
                //current_match.inputNumeroJoueurReceveur2= match[i].inputNumeroJoueurReceveur2
                //current_match.inputNomJoueurReceveur2= match[i].inputNomJoueurReceveur2
                //current_match.inputNombrePunitionsReceveur2= match[i].inputNombrePunitionsReceveur2
                //current_match.inputNumeroJoueurReceveur3= match[i].inputNumeroJoueurReceveur3
                //current_match.inputNomJoueurReceveur3= match[i].inputNomJoueurReceveur3
                //current_match.inputNombrePunitionsReceveur3= match[i].inputNombrePunitionsReceveur3
                //current_match.inputNumeroJoueurReceveur4= match[i].inputNumeroJoueurReceveur4
                //current_match.inputNomJoueurReceveur4= match[i].inputNomJoueurReceveur4
                //current_match.inputNombrePunitionsReceveur4= match[i].inputNombrePunitionsReceveur4
                //current_match.inputNumeroJoueurReceveur5= match[i].inputNumeroJoueurReceveur5
                //current_match.inputNomJoueurReceveur5= match[i].inputNomJoueurReceveur5
                //current_match.inputNombrePunitionsReceveur5= match[i].inputNombrePunitionsReceveur5
                //current_match.inputNumeroJoueurReceveur6= match[i].inputNumeroJoueurReceveur6
                //current_match.inputNomJoueurReceveur6= match[i].inputNomJoueurReceveur6
                //current_match.inputNombrePunitionsReceveur6= match[i].inputNombrePunitionsReceveur6
                //current_match.inputNumeroJoueurReceveur7= match[i].inputNumeroJoueurReceveur7
                //current_match.inputNomJoueurReceveur7= match[i].inputNomJoueurReceveur7
                //current_match.inputNombrePunitionsReceveur7= match[i].inputNombrePunitionsReceveur7
                //current_match.inputNumeroJoueurReceveur8= match[i].inputNumeroJoueurReceveur8
                //current_match.inputNomJoueurReceveur8= match[i].inputNomJoueurReceveur8
                //current_match.inputNombrePunitionsReceveur8= match[i].inputNombrePunitionsReceveur8
                //current_match.inputEntraineurHote1= match[i].inputEntraineurHote1
                //current_match.inputNumeroJoueurVisiteur1= match[i].inputNumeroJoueurVisiteur1
                //current_match.inputNomJoueurVisiteur1= match[i].inputNomJoueurVisiteur1
                //current_match.inputNombrePunitionsVisiteur1= match[i].inputNombrePunitionsVisiteur1
                //current_match.inputNumeroJoueurVisiteur2= match[i].inputNumeroJoueurVisiteur2
                //current_match.inputNomJoueurVisiteur2= match[i].inputNomJoueurVisiteur2
                //current_match.inputNombrePunitionsVisiteur2= match[i].inputNombrePunitionsVisiteur2
                //current_match.inputNumeroJoueurVisiteur3= match[i].inputNumeroJoueurVisiteur3
                //current_match.inputNomJoueurVisiteur3= match[i].inputNomJoueurVisiteur3
                //current_match.inputNombrePunitionsVisiteur3= match[i].inputNombrePunitionsVisiteur3
                //current_match.inputNumeroJoueurVisiteur4= match[i].inputNumeroJoueurVisiteur4
                //current_match.inputNomJoueurVisiteur4= match[i].inputNomJoueurVisiteur4
                //current_match.inputNombrePunitionsVisiteur4= match[i].inputNombrePunitionsVisiteur4
                //current_match.inputNumeroJoueurVisiteur5= match[i].inputNumeroJoueurVisiteur5
                //current_match.inputNomJoueurVisiteur5= match[i].inputNomJoueurVisiteur5
                //current_match.inputNombrePunitionsVisiteur5= match[i].inputNombrePunitionsVisiteur5
                //current_match.inputNumeroJoueurVisiteur6= match[i].inputNumeroJoueurVisiteur6
                //current_match.inputNomJoueurVisiteur6= match[i].inputNomJoueurVisiteur6
                //current_match.inputNombrePunitionsVisiteur6= match[i].inputNombrePunitionsVisiteur6
                //current_match.inputNumeroJoueurVisiteur7= match[i].inputNumeroJoueurVisiteur7
                //current_match.inputNomJoueurVisiteur7= match[i].inputNomJoueurVisiteur7
                //current_match.inputNombrePunitionsVisiteur7= match[i].inputNombrePunitionsVisiteur7
                //current_match.inputNumeroJoueurVisiteur8= match[i].inputNumeroJoueurVisiteur8
                //current_match.inputNomJoueurVisiteur8= match[i].inputNomJoueurVisiteur8
                //current_match.inputNombrePunitionsVisiteur8= match[i].inputNombrePunitionsVisiteur8
                //current_match.inputEntraineurVisiteur1= match[i].inputEntraineurVisiteur1
                current_match.inputPointageEquipeHote1= match[i].inputPointageEquipeHote1
                current_match.inputPointageEquipeVisiteuse1= match[i].inputPointageEquipeVisiteuse1
                current_match.inputEquipeGagnante1= match[i].inputEquipeGagnante1
                current_match.id= match[i]._id;
                all_history.push(current_match)

            }
            return all_history
        })
}

module.exports = router
