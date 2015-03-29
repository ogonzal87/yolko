var myApp = angular.module('myApp', ['ngRoute', 'appControllers', 'firebase']);

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
		})
		.when('/meeting', {
			templateUrl: 'views/meeting.html',
			controller: 'MeetingController' 
		})
		.when('/results', {
			templateUrl: 'views/results.html', 
		})
		.otherwise({
			redirectTo: '/'
		});
}]);