const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../errorHandler/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const campgrounds = require('../controllers/campgrounds');
const {isLoggedIn, isCampgroundAuthor, validateCampground} = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post( upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground));


router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.post('/search', catchAsync(campgrounds.search))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isCampgroundAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isCampgroundAuthor,catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;