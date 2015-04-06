var myApp = angular.module('myApp', ['ngRoute', 'appControllers', 'firebase'])
.constant('FIREBASE_URL', 'https://yolko.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		})
		.when('/meeting', {
			templateUrl: 'views/meeting.html',
			controller: 'MeetingController' 
		})
		.when('/results', {
			templateUrl: 'views/results.html', 
		})
		.when('/presentation/:accessCode', {
			templateUrl: 'views/presentation.html',
			controller: 'PresentationController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

myApp.value('currentUser',{name: 'abdul'});