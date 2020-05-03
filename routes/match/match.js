const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const utils = require('../../utils/utils')
const async = require('async')
const handler_db = require('../../models/requests')

router.get('/', (req, res) => {
    utils.goIfUserAllowed('access', req, res, 
        //go
        ()=>{
            //utils.normalRendering(req, res, {cegep})
            getInfo().then((data)=>{utils.normalRendering(req, res, {cegep : data[0], equipes : data[1], coaches : data[2]})})
        },
        //back
        ()=>{
            //res.redirect('/')
            utils.enterRedirect(res)
        })
})

function getInfo()
{
    return new Promise(async (resolve, reject) => {
        handler_db.handle_database_check_associations((response)=>{
            resolve(response)
        })
    })
}

function getInformationsFeuilleMatch(req)
{
    let data = {}
    return new Promise(async (resolve, reject) => {
        var query = "SELECT * FROM cegep"
        handler_db.handle_database_prepare_feuille_match(query, (response) => {
            if(response)
            {
                let cegeps = {}
                for(let i = 0; i < response.length; i++)
                {
                    let currentCegep = response[i]
                    let queryEquipe = "SELECT * FROM equipes WHERE cegep_id="+response[i].cegep_id+""

                    handler_db.handle_database_prepare_feuille_match(queryEquipe, (responseEquipe) => {
                        if(responseEquipe)
                        {
                            let equipes = {}
                            console.log('EQUIPES DE '+response[i].cegep_name+': ')
                            for(let i = 0; i < responseEquipe.length; i++)
                            {
                                let currentEquipe = responseEquipe[i]
                                console.log(responseEquipe[i].equipe_name)
                                let queryCoach = "SELECT * FROM coaches WHERE equipe_id="+responseEquipe[i].equipe_id+""

                                handler_db.handle_database_prepare_feuille_match(queryCoach, (responseCoach) => {
                                    if(responseCoach)
                                    {
                                        console.log('COACHES DE '+responseEquipe[i].equipe_name+': ')
                                        for(let i = 0; i < responseCoach.length; i++)
                                        {
                                            equipes[currentEquipe.equipe_name] = responseCoach[i].coach_name 
                                            console.log(responseCoach[i].coach_name)
                                        }
                                    }
                                    //console.log(equipes)
                                });

                            }
                            cegeps[currentCegep.cegep_name] = equipes
                            //console.log(cegeps)
                        }
                        //console.log(cegeps)
                    });

                }

            }
        });

        resolve(true)
        return
    })
}

router.post('/', (req, res) => {
    const matchReport = new Model.Match({
        inputEquipHote1: req.body.inputEquipHote1,
        inputEquipVisiteuse1: req.body.inputEquipVisiteuse1,
        inputCegepReceveur1: req.body.inputCegepReceveur1,
        inputCegepVisiteur1: req.body.inputCegepVisiteur1,
        inputNumeroJoueurReceveur1: req.body.inputNumeroJoueurReceveur1,
        inputNomJoueurReceveur1: req.body.inputNomPunitionsReceveur1,
        inputNombrePunitionsReceveur1: req.body.inputNombrePunitionsReceveur1,
        inputNumeroJoueurReceveur2: req.body.inputNumeroJoueurReceveur2,
        inputNomJoueurReceveur2: req.body.inputNomJoueurReceveur2,
        inputNombrePunitionsReceveur2: req.body.inputNombrePunitionsReceveur2,
        inputNumeroJoueurReceveur3: req.body.inputNumeroJoueurReceveur3,
        inputNomJoueurReceveur3: req.body.inputNomJoueurReceveur3,
        inputNombrePunitionsReceveur3: req.body.inputNombrePunitionsReceveur3,
        inputNumeroJoueurReceveur4: req.body.inputNumeroJoueurReceveur4,
        inputNomJoueurReceveur4: req.body.inputNomJoueurReceveur4,
        inputNombrePunitionsReceveur4: req.body.inputNombrePunitionsReceveur4,
        inputNumeroJoueurReceveur5: req.body.inputNumeroJoueurReceveur5,
        inputNomJoueurReceveur5: req.body.inputNomJoueurReceveur5,
        inputNombrePunitionsReceveur5: req.body.inputNombrePunitionsReceveur5,
        inputNumeroJoueurReceveur6: req.body.inputNumeroJoueurReceveur6,
        inputNomJoueurReceveur6: req.body.inputNomJoueurReceveur6,
        inputNombrePunitionsReceveur6: req.body.inputNombrePunitionsReceveur6,
        inputNumeroJoueurReceveur7: req.body.inputNumeroJoueurReceveur7,
        inputNomJoueurReceveur7: req.body.inputNomJoueurReceveur7,
        inputNombrePunitionsReceveur7: req.body.inputNombrePunitionsReceveur7,
        inputNumeroJoueurReceveur8: req.body.inputNumeroJoueurReceveur8,
        inputNomJoueurReceveur8: req.body.inputNomJoueurReceveur8,
        inputNombrePunitionsReceveur8: req.body.inputNombrePunitionsReceveur8,
        inputEntraineurHote1: req.body.inputEntraineurHote1,
        inputNumeroJoueurVisiteur1: req.body.inputNumeroJoueurVisiteur1,
        inputNomJoueurVisiteur1: req.body.inputNomJoueurVisiteur1,
        inputNombrePunitionsVisiteur1: req.body.inputNombrePunitionsVisiteur1,
        inputNumeroJoueurVisiteur2: req.body.inputNumeroJoueurVisiteur2,
        inputNomJoueurVisiteur2: req.body.inputNomJoueurVisiteur2,
        inputNombrePunitionsVisiteur2: req.body.inputNombrePunitionsVisiteur2,
        inputNumeroJoueurVisiteur3: req.body.inputNumeroJoueurVisiteur3,
        inputNomJoueurVisiteur3: req.body.inputNomJoueurVisiteur3,
        inputNombrePunitionsVisiteur3: req.body.inputNombrePunitionsVisiteur3,
        inputNumeroJoueurVisiteur4: req.body.inputNumeroJoueurVisiteur4,
        inputNomJoueurVisiteur4: req.body.inputNomJoueurVisiteur4,
        inputNombrePunitionsVisiteur4: req.body.inputNombrePunitionsVisiteur4,
        inputNumeroJoueurVisiteur5: req.body.inputNumeroJoueurVisiteur5,
        inputNomJoueurVisiteur5: req.body.inputNomJoueurVisiteur5,
        inputNombrePunitionsVisiteur5: req.body.inputNombrePunitionsVisiteur5,
        inputNumeroJoueurVisiteur6: req.body.inputNumeroJoueurVisiteur6,
        inputNomJoueurVisiteur6: req.body.inputNomJoueurVisiteur6,
        inputNombrePunitionsVisiteur6: req.body.inputNombrePunitionsVisiteur6,
        inputNumeroJoueurVisiteur7: req.body.inputNumeroJoueurVisiteur7,
        inputNomJoueurVisiteur7: req.body.inputNomJoueurVisiteur7,
        inputNombrePunitionsVisiteur7: req.body.inputNombrePunitionsVisiteur7,
        inputNumeroJoueurVisiteur8: req.body.inputNumeroJoueurVisiteur8,
        inputNomJoueurVisiteur8: req.body.inputNomJoueurVisiteur8,
        inputNombrePunitionsVisiteur8: req.body.inputNombrePunitionsVisiteur8,
        inputEntraineurVisiteur1: req.body.inputEntraineurVisiteur1,
        inputPointageEquipeHote1: req.body.inputPointageEquipeHote1,
        inputPointageEquipeVisiteuse1: req.body.inputPointageEquipeVisiteuse1,
        inputEquipeGagnante1: req.body.inputEquipeGagnante1
    })

    //matchReport.save((err, room)=>{console.log(room.id)}).then((err, room) => console.log("Match save dans la db Mongo".green +room.id))
    matchReport.save((err, room)=>{

        let matchId = room.id
        let coach = [req.body.inputEntraineurHote1, req.body.inputEntraineurVisiteur1]
        notifyCoach(coach, matchId)
    })

    res.redirect('/match')
})

async function notifyCoach(coach, matchId)
{
    for(let i = 0; i < coach.length; i++)
    {
        var SQLquery = "SELECT * FROM coaches WHERE coach_name='"+coach[i]+"'";
        handler_db.handle_database_notify_coach(SQLquery, matchId, (response) => {
            // ouais, ya rien... INCROYABLE!
        });
    }
}

module.exports = router
