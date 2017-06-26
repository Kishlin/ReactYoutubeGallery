var firebase = require('firebase'); 
var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
var AppAPI = require('./utils/appAPI.js');
var AppConstants = require('./constants/AppConstants');

firebase.initializeApp(AppConstants.FIREBASE);
AppAPI.getVideos();

ReactDOM.render(
	<App />,
	document.getElementById('app')
);