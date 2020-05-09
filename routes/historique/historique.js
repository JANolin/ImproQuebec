const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const utils = require('../../utils/utils')

router.get('/', (req, res) => { 
    utils.goIfUserAllowed('access', req, res, 
        //go
        ()=>{
            getHistorique().then((data)=>{
                utils.normalRendering(req, res, {data : data})
            })
        },
        //back
        ()=>{
            res.redirect('/')
        })
})

async function getHistorique()
{
    var all_history = []

    await Model.Match.find(function (err, match) {
        if (err) return console.error(err)

        for(let i = 0; i < match.length; i++)
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
    })

    return all_history
}

module.exports = router
