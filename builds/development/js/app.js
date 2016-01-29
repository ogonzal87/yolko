var myApp = angular.module('YolkoApp', [
	'ngRoute',
	'appControllers',
	'firebase'
])

angular.module('YolkoApp')
.constant('FIREBASE_URL', 'https://imyolko.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

angular.module('YolkoApp')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
		})
		.when('/meeting', {
			templateUrl: 'views/meeting.html',
			controller: 'AttendeeController'
		})
		.when('/results', {
			templateUrl: 'views/results.html',
			controller: 'PresenterController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
