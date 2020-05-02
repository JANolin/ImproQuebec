const express = require('express')
const router = express.Router()
const utils = require('../../utils/utils')
const handler_db = require('../../models/requests')

router.get('/', (req, res) => {
    utils.goIfUserAllowed("access", req, res,
        //go
        ()=>{
            checkNotifications(req).then((result)=>{utils.normalRendering(req, res, {notifications_coach : result})})
            //utils.normalRendering(req, res)
        }
        ,
        //back
        ()=>{
            res.redirect('/')
        })
})

function checkNotifications(req)
{
    return new Promise((resolve, reject) => {
        if(req.session.key === undefined)
        {
            resolve(false)
            return
        }else
        {
            handler_db.handle_database_check_notifs(req, (response) => {
                if(response)
                {
                    for(let i = 0; i < response.length; i++)
                    {
                        resolve(true)
                        return
                    }

                }else
                {
                    resolve(false)
                    return
                }
            });
        }

        return
    })
}

module.exports = router
