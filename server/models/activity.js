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

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;