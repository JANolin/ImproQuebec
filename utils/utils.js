const express = require('express')

function getUserRoles(req) {
    var userRoles = {}

    switch(req.session.key.user_role) {
        case 'admin':
            userRoles.admin = true
            break
        case 'user':
            userRoles.user = true
            break
        case 'equipe':
            userRoles.equipe = true
            break
        case 'joueur':
            userRoles.joueur = true
            break
        case 'coach':
            userRoles.coach = true
            break
        default:
            break
    }

    return userRoles
}

function checkRoleUser(req, role) {
    return (req.session.key.user_role == role)
}

module.exports = {getUserRoles : getUserRoles,
                  checkRoleUser : checkRoleUser}
