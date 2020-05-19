const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')
const utils = require('../../utils/utils')
const handler_db = require('../../models/requests')

router.get('/', (req, res) => {
utils.goIfUserAllowed("access", req, res,
        //go
        ()=>{
            getEquipes().then((data)=>{
                utils.normalRendering(req, res, {data : data})
            })
        },
        //back
        ()=>{
            res.redirect('/')
        })
})

async function getEquipes(req)
{
    var all_equipes = [] 
    await handler_db.handle_database_find_equipes(req, (response) => {
        if(response == undefined)
        {
            console.log('pas d\'equipes, ouais.')
        }else
        {
            for(let i = 0; i < response.length; i++)
            {
                let current_match = {}
                current_match.equipeName= response[i].equipe_name
                current_match.equipeId= response[i].equipe_id
                all_equipes.push(current_match)
            }
        }
    });

    return all_equipes
}

module.exports = router
