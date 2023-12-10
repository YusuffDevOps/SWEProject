const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    desc : {
        type: String,
        required:true
    },
    imageType: String, 
    userEmail: String,
    category: {
        type: String,
        required: true,
        enum: ["fauna", "flora"],
    },
    image:{
        type:Buffer,
        required:true
    },
    date_time: {
        type: Date,
        default: new Date()
    }
});
uploadedImage = mongoose.model("UploadedImage", imageSchema)
galleryImage = mongoose.model("galleryImage", imageSchema)
module.exports = {uploadedImage, galleryImage};