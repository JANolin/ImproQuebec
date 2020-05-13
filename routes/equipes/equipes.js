const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')

router.get('/', (req, res) => { if(req.session.key) {
    
    var all_equipes = new Array()

    Model.Equipe.find(function (err, equipe) {
        if (err) return console.error(err)
        var current_equipe = new Object()

        for(let i = 0; i < equipe.length; i++){
            current_equipe.nomEquipe = equipe[i].nomEquipe
            current_equipe.id = equipe[i]._id
            all_equipes.push(current_equipe)
        }
        res.render('equipes', {user_name: req.session.key["user_name"], meta: all_equipes })
    })
}
else
{
    res.redirect('/')
}
})

module.exports = router
