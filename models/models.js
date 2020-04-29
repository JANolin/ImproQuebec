const db = require('./db')

const Match = db.model("Match", { 
                                    inputEquipHote1: '',
                                    inputEquipVisiteuse1: '',
                                    inputCegepReceveur1: '',
                                    inputCegepVisiteur1: '',
                                    inputNumeroJoueurReceveur1: '',
                                    inputNomJoueurReceveur1: '',
                                    inputNombrePunitionsReceveur1: '',
                                    inputNumeroJoueurReceveur2: '',
                                    inputNomJoueurReceveur2: '',
                                    inputNombrePunitionsReceveur2: '',
                                    inputNumeroJoueurReceveur3: '',
                                    inputNomJoueurReceveur3: '',
                                    inputNombrePunitionsReceveur3: '',
                                    inputNumeroJoueurReceveur4: '',
                                    inputNomJoueurReceveur4: '',
                                    inputNombrePunitionsReceveur4: '',
                                    inputNumeroJoueurReceveur5: '',
                                    inputNomJoueurReceveur5: '',
                                    inputNombrePunitionsReceveur5: '',
                                    inputNumeroJoueurReceveur6: '',
                                    inputNomJoueurReceveur6: '',
                                    inputNombrePunitionsReceveur6: '',
                                    inputNumeroJoueurReceveur7: '',
                                    inputNomJoueurReceveur7: '',
                                    inputNombrePunitionsReceveur7: '',
                                    inputNumeroJoueurReceveur8: '',
                                    inputNomJoueurReceveur8: '',
                                    inputNombrePunitionsReceveur8: '',
                                    inputEntraineurHote1: '',
                                    inputNumeroJoueurVisiteur1: '',
                                    inputNomJoueurVisiteur1: '',
                                    inputNombrePunitionsVisiteur1: '',
                                    inputNumeroJoueurVisiteur2: '',
                                    inputNomJoueurVisiteur2: '',
                                    inputNombrePunitionsVisiteur2: '',
                                    inputNumeroJoueurVisiteur3: '',
                                    inputNomJoueurVisiteur3: '',
                                    inputNombrePunitionsVisiteur3: '',
                                    inputNumeroJoueurVisiteur4: '',
                                    inputNomJoueurVisiteur4: '',
                                    inputNombrePunitionsVisiteur4: '',
                                    inputNumeroJoueurVisiteur5: '',
                                    inputNomJoueurVisiteur5: '',
                                    inputNombrePunitionsVisiteur5: '',
                                    inputNumeroJoueurVisiteur6: '',
                                    inputNomJoueurVisiteur6: '',
                                    inputNombrePunitionsVisiteur6: '',
                                    inputNumeroJoueurVisiteur7: '',
                                    inputNomJoueurVisiteur7: '',
                                    inputNombrePunitionsVisiteur7: '',
                                    inputNumeroJoueurVisiteur8: '',
                                    inputNomJoueurVisiteur8: '',
                                    inputNombrePunitionsVisiteur8: '',
                                    inputEntraineurVisiteur1: '',
                                    inputPointageEquipeHote1: '',
                                    inputPointageEquipeVisiteuse1: '',
                                    inputEquipeGagnante1: ''

})

const User = db.model("User", {
                                    username: String,
                                    password: String
})

const Equipe = db.model("Equipe", {
                                    nomEquipe: String,
                                    nomJoueur1: String,
                                    nomJoueur2: String,
                                    nomJoueur3: String,
                                    nomJoueur4: String,
                                    nomJoueur5: String,
                                    nomJoueur6: String,
                                    nomJoueur7: String,
                                    nomJoueur8: String,
})

module.exports.Match = Match
module.exports.User = User
module.exports.Equipe = Equipe
