const CampGround = require('../models/campground');
const Review = require('../models/review');


module.exports.CreateReview = async (req,res)=>{
    // creates a review then redirects to the campground page where review is created

    const campground = await CampGround.findById(req.params.id);
    const newReview = new Review(req.body.review);
    campground.reviews.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await campground.save();
    req.flash('success','Review Added Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    // deletes a review then redirects to the campground page where review was deleted

    const {id,reviewId} = req.params;
    await CampGround.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted Successfully');
    res.redirect(`/campgrounds/${id}`);
}
