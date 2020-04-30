const express = require('express')
const handler_db = require('../models/requests')

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
    logout : 9
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
                        resolve('a les perms')
                        return
                    }
                }

            }
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
    console.log("Tentative avec perm pour : " + rsc)
    checkIfUserAllowed(perm, rsc, req).then((msg)=>go(rsc), (err)=>back(err))
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

module.exports = {getUserRoles : getUserRoles,
    checkRoleUser : checkRoleUser,
    goIfUserAllowed : goIfUserAllowed,
    renderWithPerms : renderWithPerms}
