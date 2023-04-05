const express = require('express');
const router = express.Router({mergeParams: true});


const catchAsync = require('../errorHandler/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor, isLoggedInNewReview} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedInNewReview, validateReview, catchAsync( reviews.CreateReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;