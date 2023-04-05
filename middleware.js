const ExpressError = require('./errorHandler/ExpressError');
const {campgroundValidation,reviewValidation,contactValidation} = require('./errorHandler/validationSchemas');
const CampGround = require('./models/campground');
const Review = require('./models/review');
const {cloudinary} = require('./cloudinary');


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('info','You Must Be Signed In First');
        return res.redirect('/login');
    }
    next();
}

module.exports.isLoggedInNewReview = (req,res,next)=>{
    if(req.body.review) req.session.review = req.body.review;
    if(!req.isAuthenticated()){
        req.flash('info','You Must Be Signed In First');
        return res.redirect('/login');
    }
    next();
}

module.exports.isCampgroundAuthor = async (req,res,next)=>{
    const {id} = req.params;
    const campground = await CampGround.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You Do Not Have Permission');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You Do Not Have Permission');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateCampground = (req,res,next)=>{
    const{error}=campgroundValidation.validate(req.body);
    if(error){
        for(let i of req.files) cloudinary.uploader.destroy(i.filename);
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    if(!req.body.review) req.body.review = req.session.review;
    const{error}=reviewValidation.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

module.exports.validateContact = (req,res,next)=>{
    const{error}=contactValidation.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}