var firebase = require('firebase'); 
var AppActions = require('../actions/AppActions');

module.exports = {
	saveVideo: function(video){
		var database = firebase.database();
  		var newKey = firebase.database().ref().child('videos').push().key;

		var updates = {};
		updates['/videos/' + newKey] = video;

		firebase.database().ref().update(updates);

		return newKey;
	},

	getVideos: function(){
		var database = firebase.database();
		database.ref().once('value', function(snapshot) {
			var videos = [];
			snapshot.forEach(function(childSnapshot) {
				Object.keys(childSnapshot.val()).forEach(function(key) {
					var data = childSnapshot.val()[key];
					var video = {
						id: key,
						title: data.title,
						video_id: data.video_id,
						description: data.description
					}
					videos.push(video);
				});
			});

			AppActions.receiveVideos(videos);
		});
	},

	removeVideo: function(videoId){
		var database = firebase.database();
		firebase.database().ref('/videos/' + videoId).remove();
	}
}