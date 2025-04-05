const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const {upload} = require("../config/multer");
const {uploadImagesMiddleware} = require("../middleware/imageUpload");
const {protectRoute} = require("../middleware/protectedRoute")

router.get('/search-items', propertyController.searchProperties);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateProperty);
router.get('/user-properties/:id', protectRoute, propertyController.getUserProperties);
router.post('/',upload.array('files', 10),uploadImagesMiddleware,protectRoute, propertyController.createProperty);



module.exports = router