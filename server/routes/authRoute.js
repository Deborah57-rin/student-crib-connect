const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { upload } = require('../config/multer');
const { uploadImagesMiddleware } = require('../middleware/imageUpload');

router.get('/', userController.getAllUsers);
router.get('/details/:id', userController.getUserDetails);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.put('/profile-image/:id',upload.array('files', 10),uploadImagesMiddleware, userController.updateProfile)
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);







module.exports = router
