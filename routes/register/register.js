const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')

/**
 IMPORT POUR BRCYPT
**/
const bcrypt = require('bcryptjs');
//NOMBRE DE PASSE POUR SALT LES HASH
const passageSalt = 10

router.get('/', (req, res) => {
    if(req.session.key)
    {
        res.redirect('/match')
    }else
    {
        res.render('register')
    }
})

router.post('/', (req, res) => {

    var SQLquery
    bcrypt.hash(req.body.inputPasswordRegister1, passageSalt, function(err, hash) {
        SQLquery = "INSERT into user_login(user_email,user_password,user_name,user_role) VALUES ('"+req.body.inputEmailRegister1+"','"+hash+"','"+req.body.inputUsernameRegister1+"','user')";

        handler_db.handle_database_register(req, SQLquery, (response) => {
            if(response)
            {
                //SI LE COMPTE EXISTE DEJA
                //MEME REDIRECTION MAIS DANS LE FUTURE IL FAUT FAIRE DES MESSAGES
                //POUR LES UTILISATEURS (MESSAGES DERREURS)
                res.redirect('/')
            }else
            {
                //CREATION DE COMPTE AVEC SUCCES
                res.redirect('/')
            }

        });
    });

})

module.exports = router
