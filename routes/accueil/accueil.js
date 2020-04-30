const express = require('express')
const router = express.Router()
const utils = require('../../utils/utils')

router.get('/', (req, res) => {
    utils.goIfUserAllowed("access", req, res,
            //go
        (rsc)=>{
            utils.renderWithPerms(req, res, rsc)
        },
            //back
        (err)=>{
            console.log('Pas les perms car : ' + err)
            res.redirect('/')
        })
})

module.exports = router
