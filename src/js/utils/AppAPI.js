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
}