const mongoose = require('mongoose');
const Review = require('./review.js');
const {cloudinary} = require('../cloudinary');


const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url:String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/c_fill,h_100,w_100');
});


const CampgroundSchema = new Schema({
    title:String,
    price:Number,
    description:String,
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    location:String,
    images:[ImageSchema],
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:'Review'
    }]
},opts);

CampgroundSchema.virtual('properties.popUp').get(function(){
    return `<a href="/campgrounds/${this.id}">${this.title}</a>`;
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc) await Review.deleteMany({_id:{$in: doc.reviews}});
    for(let i in doc.images){
        cloudinary.uploader.destroy(doc.images[i].filename);
    }
})
module.exports = mongoose.model('CampGround',CampgroundSchema);