const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const upload = require('../multerConfig/storageConfig')

//register
router.post('/employee/register',upload.single('user_profile'),userController.userRegister)
//getallusers
router.get('/get-all-employees',userController.getallusers)
//getuserdetails
router.get('/employee/view/:id',userController.getuserdetail)

module.exports = router