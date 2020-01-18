const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs'),


const publicPath = path.join(__dirname, '../public');

mongoose.connect(
    'mongodb+srv://rasik:admin123@cluster0-w8pwt.mongodb.net/test?retryWrites=true&w=majority', 
    { useNewUrlParser: true })
    .then(() => console.log('Database Connected')
    .catch(() => {
        console.log('err')
    })
);

mongoose.Promise = global.Promise;


const Camera = require('./models/camera');
const Activity = require('./models/activity');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// var {getLocationFromCameraId} = require('./utils');

// app.engine('html', mustache());
// app.set('view engine', 'html');
// app.set('views', publicPath);
// app.use(express.static(publicPath));



app.use(express.static(path.join(__dirname, '../static')));

app.use(bodyParser.json());

app.io = io;

io.on('connection', (socket) => {
	console.log('New user detected');

	socket.on('disconnect', () => {
		console.log('User left');
	});
});

// routes 

//save detected ativity
app.post('/api/activity/', (req, res) => {

        // console.log(req.body)

        let camera_id = req.body.camera_id
        let activity_name = req.body.activity_name
        let screenshot_url = req.body.screenshot_url
        let start_time = req.body.start_time
        let end_time = req.body.end_time
        
        const newActivity = new Activity({
            activity_name : activity_name,
            screenshot_url : screenshot_url,
            start_time : start_time,
            end_time : end_time
        })

        // save new activity
        console.log(newActivity)
        newActivity.save().then((res) => {
            console.log('saved activity')
        }).catch((err) => {
            console.log(err)
        })

        // add it to the camera from which it was detected
        Camera.update(
            {camera_id : camera_id},
            {$push : {activities_detected : newActivity}}
        ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })

        // get camera details
        let landmark = ''
        let latitude = 0.0
        let longitude = 0.0
        Camera.findOne({camera_id: camera_id}).then((res) => {
            landmark = res.landmark
            latitude = res.latitude
            longitude = res.longitude
        })

        req.app.io.emit('newactivity', {
                camera_id,
                latitude,
                longitude,
                landmark,
                activity_name,
                screenshot_url,
                start_time,
                end_time
        });

        res.status(200).send(); 
    
});

//list all activites 

app.get('/api/activity/', (req, res) =>{

    Activity.find(req.query).then((result) => {
        if(result.length === 0){
            res.json({message : 'query does not match any Event'})
        }
        else {
            res.status(200).json(result)
        }
        }).catch((err) => {console.log(err)})

})

// create camera
app.post('/api/camera/', (req, res) => {
    const newCamera = new Camera({
        camera_id : req.body.camera_id,
        landmark : req.body.landmark,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })

    newCamera.save().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    })
})

// get cameras
app.get('/api/camera/', (req, res) => {
    Camera.find(req.query).then((result) => {
        if(result.length === 0){
            res.json({message : 'query does not match any Event'})
         }
         else {
            res.status(200).json(result)
         }
    }).catch((err) => {
        console.log(err)
    })
})

//Frontend routes go here
app.get('/', (req, res) => {
    res.render('index')
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

