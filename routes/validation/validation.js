const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

router.get('/', (req, res) => {
    if(req.query.id != undefined)
    {
        utils.goIfUserAllowed("update", req, res,
            //go
            ()=>{
                validation(req, req.query.id).then((result)=>{res.redirect('/validation')})
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
                getFeuilleAValider(req).then((data)=>{
                    utils.normalRendering(req, res, {data : data})
                })
            },
            //back
            ()=>{
                res.redirect('/')
            })
    }
})

async function getFeuilleAValider(req)
{
    var all_history = [] 
    await Model.Match.find(async function (err, match) {
        if (err) return console.error(err)

        await handler_db.handle_database_find_validation_perso(req, (response) => {
            if(response == undefined)
            {
                console.log('ha')
            }else
            {
                for(let i = 0; i < match.length; i++)
                {
                    for(let j = 0; j < response.length; j++)
                    {
                        if(response[j].notification_match_id == match[i]._id)
                        {
                            let current_match = {}
                            current_match.inputEquipHote1= match[i].inputEquipHote1
                            current_match.inputEquipVisiteuse1= match[i].inputEquipVisiteuse1
                            current_match.inputPointageEquipeHote1= match[i].inputPointageEquipeHote1
                            current_match.inputPointageEquipeVisiteuse1= match[i].inputPointageEquipeVisiteuse1
                            current_match.inputEquipeGagnante1= match[i].inputEquipeGagnante1
                            current_match.id= match[i]._id;
                            all_history.push(current_match)
                        }
                    }
                }
            }
        });
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
                    resolve(false)
                    return

                }else
                {
                    resolve(true)
                    return
                }
            });
        }

        return
    })
}

module.exports = router
