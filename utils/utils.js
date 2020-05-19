const express = require('express')
const handler_db = require('../models/requests')
const colors = require('colors')
const async = require('async')

const ALL_PERMS = {
    access : 1,
    read : 2,
    write : 3,
    delete : 4,
    update : 5
}

const ALL_ROLES = {
    admin : 1,
    user : 2,
    equipe : 3,
    coach : 4,
    guest : 5
}

const ALL_RSC = {
    accueil : 1,
    login : 2,
    register : 3,
    match : 4,
    historique : 5,
    equipe : 6,
    horaire : 7,
    enter : 8,
    logout : 9,
    validation : 10,
    equipes : 11,
    ajoutequipe : 12
}

function getUserRoles(req) {
    var userRoles = {} 
    switch(req.session.key.user_role) {
        case ALL_ROLES['admin']:
            userRoles.admin = true
            break
        case ALL_ROLES['user']:
            userRoles.user = true
            break
        case ALL_ROLES['equipe']:
            userRoles.equipe = true
            break
        case ALL_ROLES['coach']:
            userRoles.coach = true
            break
        case ALL_ROLES['guest']:
            userRoles.guest = true
            break
        default:
            break
    }
    return userRoles
}

function checkRoleUser(req, role) {
    return (req.session.key.user_role == role)
}

function checkIfUserAllowed(perm, rsc, req)
{
    return new Promise((resolve, reject) => {
        handler_db.handle_database_check_perms(req, ALL_RSC[rsc] , (response) => {
            if(response)
            {
                for(let i = 0; i < response.length; i++)
                {
                    if(response[i].permission_id == ALL_PERMS[perm])
                    {
                        console.log('✔️ Action : '.green + perm + ' : effectuee avec success pour la ressource : '.green + rsc)
                        resolve('a les perms')
                        return
                    }
                }

            }
            console.log('❌ Action : '.red + perm + ' refusee pour la ressource : '.red + rsc)
            reject('na pas les perms')
            return
        });

        return
    })
}

async function goIfUserAllowed(perm, req, res, go, back) {
    let rsc = req.baseUrl.substring(1);
    if(rsc === "")
    {
        rsc = "enter" 
    }
    console.log("Tentative d'acces a : ".magenta + rsc +" avec perms ...".magenta)
    checkIfUserAllowed(perm, rsc, req).then((msg)=>{go()}, (err)=>{back()})
    //checkIfUserAllowed(perm, rsc, req).then((msg)=>executeGoStackAsync(goStack), (err)=>executeBackStackAsync(backStack))
}

function executeGoStackAsync(execStack)
{
    Promise.all(execStack).then((msg)=>{console.log(msg)}, ()=>{})
}

function executeBackStackAsync(execStack)
{
    Promise.all(execStack).then((msg)=>{console.log(msg)}, ()=>{})
}

function normalRendering(req, res, passing)
{
    let rsc = req.baseUrl.substring(1);
    if(rsc === "")
    {
        rsc = "enter" 
    }
    return new Promise((resolve, reject) => {
        let userRoles = {} 
        let dataPassing = passing
        let userContext = true
        if(req.session.key === undefined)
        {
            userRoles.guest = true
            userContext = false
        }else
        {
            userRoles = getUserRoles(req) 
        }

        res.render(rsc, {user_role : userRoles, user_context : userContext, data : dataPassing})
        resolve('good pour le render')
    })

}

function enterRedirect(res)
{
    return new Promise((resolve, reject) => {
        res.redirect('/')
        resolve('good')
    })
}

function renderWithPerms(req, res, rsc, passing)
{
    let userRoles = {} 
    let dataPassing = passing
    let userContext = true
    if(req.session.key === undefined)
    {
        userRoles.guest = true
        userContext = false
    }else
    {
        userRoles = getUserRoles(req) 
    }

    res.render(rsc, {user_role : userRoles, user_context : userContext, data : dataPassing})
}

module.exports = {
    getUserRoles : getUserRoles,
    checkRoleUser : checkRoleUser,
    goIfUserAllowed : goIfUserAllowed,
    renderWithPerms : renderWithPerms,
    normalRendering : normalRendering,
    enterRedirect : enterRedirect
}
