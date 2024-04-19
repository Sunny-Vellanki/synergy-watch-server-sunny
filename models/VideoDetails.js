const mongoose = require("mongoose");

const VideoDetails = new mongoose.Schema({
    video_url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    view_count: {
        type: String,
        required: true
    },
    video_description:{
        type:String,
        required:true
        
    },
    video_published_date:{
        type:String,
        required:true
    },
    channel_logo:{
        type:String,
        required:true
    },
    channel_subscribers:{
        type:String,
        required:true
    },
    channel_name:{
        type:String,
        required:true
    },
    savedStatus:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail_url:{
        type:String,
        required:true
    }

    

    
    
});

const Videos = mongoose.model("VideosDetails", VideoDetails);

module.exports = Videos;