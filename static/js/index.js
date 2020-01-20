var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newactivity', (data) => {
	console.log(data);
	
	// let latitude = data.location.latitude
	// let longitude = data.location.longitude


	
	console.log('rasik')

	// axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.731,-73.997&key=AIzaSyA5aQ9SIBC6W6iUhSJg1IEQHHunN_sP4ow`)
	// 	.then((data) => {
	// 		console.log(data)
	// }).catch((err) => {
	// 	console.log(err)
	// })
	
		var html = `
			<div class="activity-alert new">
				<h3><img src=${data.screenshot_url} /> </h3>
				<h2>ALERT</h2>
				<h3>Suspicion of ${data.activity_name} </h3>
				<h3><span>Camera </span>: ${data.camera_id} </h3>
				<h3><span>Location </span>: ${data.latitude}, ${data.longitude}</h3>
				<h3><span>Landmark </span>:  ${data.landmark} </h3>
				<h3><span>Start Time </span>: ${moment(data.start_time).format('MMMM Do YYYY, h:mm:ss a')} </h3>
                <h3><span>End Time </span>: ${moment(data.end_time).format('MMMM Do YYYY, h:mm:ss a')} </h3>
				
				<h4>${moment(data.end_time).startOf('minute').fromNow()}</h4>
			</div>
			`

		$('#alert-container').prepend(html);

	});
