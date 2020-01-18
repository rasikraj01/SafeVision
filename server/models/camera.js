const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    activity_name:{
        type:String,
        required: true
    },
    screenshot_url : {
        type:String,
        required: true
    },
    start_time : {
      type: Date,
      default: Date.now,
      required: true,
    },
    end_time : {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const cameraSchema = mongoose.Schema({
    camera_id : {
        type:String,
        required: true
    },
    landmark : {
        type:String,
        required: true    
    },
    latitude:{
       type:Number,
       required: true
    },
    longitude : {
        type:Number,
        required: true
    },
    activities_detected : [activitySchema]
});

const Camera = mongoose.model('camera', cameraSchema);
module.exports = Camera;