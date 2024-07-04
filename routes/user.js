const path = require('path');

const express = require('express');

const userControler=require('../controllers/user')

const router = express.Router();



router.post('/user/add-user',userControler.postUsers)

router.get('/users',userControler.getUsers)

router.delete('/delete/:id',userControler.deleteUser)


module.exports=router

