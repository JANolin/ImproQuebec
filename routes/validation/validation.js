const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {
    if(req.query.id != undefined)
    {
        console.log('ya de la marde icitte')
        utils.goIfUserAllowed("access", req, res,
            //go
            ()=>{
                validation(req, req.query.id).then((result)=>{utils.normalRendering(req, res)})
            }
            ,
            //back
            ()=>{
                res.redirect('/')
            })
    }else
    {

        utils.goIfUserAllowed("access", req, res,
            //go
            ()=>{
                var data = getFeuilleAValider(req)
                utils.normalRendering(req, res, {data : data})
            },
            //back
            ()=>{
                res.redirect('/')
            })
    }
})


function getFeuilleAValider(req)
{
    var all_history = new Array()
    Model.Match.find(function (err, match) {
        if (err) return console.error(err)

        for(let i = 0; i < match.length; i++)
        {
            let current_match = new Object() 
            current_match.inputEquipHote1= match[i].inputEquipHote1
            current_match.inputEquipVisiteuse1= match[i].inputEquipVisiteuse1
            current_match.inputPointageEquipeHote1= match[i].inputPointageEquipeHote1
            current_match.inputPointageEquipeVisiteuse1= match[i].inputPointageEquipeVisiteuse1
            current_match.inputEquipeGagnante1= match[i].inputEquipeGagnante1
            current_match.id= match[i]._id;
            all_history.push(current_match)
        }
    })
    return all_history
}

function validation(req, matchId)
{
    return new Promise((resolve, reject) => {
        if(req.session.key === undefined)
        {
            resolve(false)
            return
        }else
        {
            handler_db.handle_database_validation_feuille(req, matchId, (response) => {
                if(response == undefined)
                {
                    console.log('pas good, feuille pas delete')
                    resolve(false)
                    return

                }else
                {
                    console.log('good feuille delete')
                    resolve(true)
                    return
                }
            });
        }

        return
    })
}

module.exports = router
