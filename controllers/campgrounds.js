const CampGround = require('../models/campground');
const {cloudinary} = require('../cloudinary');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({accessToken: mapBoxToken})


module.exports.index = async (req,res)=>{
    // show all campgrounds
    const Campgrounds = await CampGround.find({}).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    res.render('campgrounds/index',{Campgrounds});
}

module.exports.renderNewForm = (req,res)=>{
    // renders a from to make new campground
    res.render('campgrounds/new');
}

module.exports.createNewCampground = async (req,res)=>{
    // a post request that creates a new campground 
    // then redirects to show page of this newly created campground
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();

    const newCampground = new CampGround(req.body.campground);
    newCampground.geometry=geoData.body.features[0].geometry;
    newCampground.images = req.files.map(f=>({url:f.path, filename:f.filename}))
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success','Campground Added Successfully');
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.showCampground = async (req,res)=>{
    // shows a page with detailed information of a campground including reviews 
    const campground = await CampGround.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(campground.images);
    if(!campground){
        req.flash('error',"Campground Does Not Exits");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}

module.exports.renderEditForm = async (req,res)=>{
    // renders a form to edit a campground
    const campground = await CampGround.findById(req.params.id);
    if(!campground){
        req.flash('error',"Campground Does Not Exits");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}

module.exports.updateCampground = async (req,res)=>{
     // a post request that updates a campground 
    // then redirects to show page of this updated campground
    const {id} =req.params;
    const campground = await CampGround.findByIdAndUpdate(id,{...req.body.campground});
    const imgs = req.files.map(f=>({url:f.path, filename:f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages) cloudinary.uploader.destroy(filename);
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success','Campground Updated Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req,res)=>{
    // deletes a campground then redirects to index page
    const {id} = req.params;
    await CampGround.findByIdAndDelete(id);
    req.flash('success','Campground Deleted Successfully');
    res.redirect('/campgrounds');
}

module.exports.search = async (req,res)=>{
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      }
    const regex = new RegExp(escapeRegex(req.body.search), 'gi');
    const Campgrounds = await CampGround.find({title: regex}).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    
    if(Campgrounds.length<1){
        req.flash('error',' Campground Not Found');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/index',{Campgrounds});
}