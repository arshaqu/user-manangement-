const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

router.get('/',userController.view)
router.post('/',userController.find)
router.get('/adduser',userController.form)
router.post('/adduser',userController.create)
router.get('/edituser/:id',userController.edit)
router.post('/edituser/:id',userController.updateuser)
router.get('/:id',userController.deleting)



module.exports = router;