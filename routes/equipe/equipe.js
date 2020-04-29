const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const mongo = require('mongodb')

router.get('/', (req, res) => { if(req.session.key) {
    var current_equipe_arr = new Array()

    Model.Equipe.find({_id: new mongo.ObjectId(req.query.id)}, function (err, equipe) {
        if (err) return console.error(err)
        var current_equipe = new Object()

        for(let i = 0; i < equipe.length; i++){
            current_equipe.nomEquipe = equipe[i].nomEquipe
            current_equipe.nomJoueur1 = equipe[i].nomJoueur1
            current_equipe.nomJoueur2 = equipe[i].nomJoueur2
            current_equipe.nomJoueur3 = equipe[i].nomJoueur3
            current_equipe.nomJoueur4 = equipe[i].nomJoueur4
            current_equipe.nomJoueur5 = equipe[i].nomJoueur5
            current_equipe.nomJoueur6 = equipe[i].nomJoueur6
            current_equipe.nomJoueur7 = equipe[i].nomJoueur7
            current_equipe.nomJoueur8 = equipe[i].nomJoueur8
            current_equipe_arr.push(current_equipe)
        }

        res.render('equipe', {user_name: req.session.key["user_name"], meta: current_equipe_arr })
    })
}
else
{
    res.redirect('/')
}
})

module.exports = router
