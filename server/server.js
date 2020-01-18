const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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


server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

