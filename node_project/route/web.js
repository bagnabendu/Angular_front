const express=require('express')
const routee=express.Router()
const controller=require('../controller/newcontroller')

routee.post('/add',controller.adduser)
routee.post('/login',controller.login_user)
routee.get('/get',controller.getuser)
routee.get('/edit/:id',controller.edit)
routee.put('/update/:id',controller.updatedata)
routee.delete('/delete/:id',controller.deleteuser)



module.exports=routee