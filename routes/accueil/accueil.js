const express = require('express')
const router = express.Router()
const utils = require('../../utils/utils')

router.get('/', (req, res) => {
    if(req.session.key)
    {
        res.render('accueil', {user_context: true, user_role : utils.getUserRoles(req)})
    }else
    {
        res.redirect('/')
    }
})

module.exports = router
