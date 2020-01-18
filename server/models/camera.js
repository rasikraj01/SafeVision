const mongoose = require('mongoose');

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
    activities_detected : [{ type: mongoose.Schema.Types.ObjectId, ref: 'activitySchema' }]
});

const Camera = mongoose.model('camera', cameraSchema);
module.exports = Camera;