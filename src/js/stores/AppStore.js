var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _videos = [];

var AppStore = assign({}, EventEmitter.prototype, {
	saveVideo: function(video){
		_videos.push(video);
	},
	getVideos: function(){
		return _videos;
	},
	setVideos: function(videos){
		_videos = videos
	},
	removeVideo: function(videoId){
		var index = _videos.findIndex(x => x.id === videoId);
		_videos.splice(index, 1);
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case AppConstants.SAVE_VIDEO:
			// API Save
			var key = AppAPI.saveVideo(action.video);

			// Store Save
			action.video.id = key;
			AppStore.saveVideo(action.video);

			// Emit Change
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_VIDEOS:
			// Set Videos
			AppStore.setVideos(action.videos);

			// Emit Change
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.REMOVE_VIDEO:
			// Store Remove
			AppStore.removeVideo(action.videoId);

			// API Remove
			AppAPI.removeVideo(action.videoId);

			// Emit Change
			AppStore.emit(CHANGE_EVENT);
			break;
	}

	return true;
});

module.exports = AppStore;