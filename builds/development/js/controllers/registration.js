myApp.controller('RegistrationController', function(Authentication, FIREBASE_URL, $scope, $firebaseAuth, $location) {

	// $scope.$on('$viewContentLoaded', function() {
	// 	console.log($scope.myform);
	// });

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);


	$scope.login = function() {
		Authentication.login($scope.presenter)
		.then(function(presenter) {
			$location.path('/meeting');
		}).catch(function(error) {
			$scope.errormessage = error.message;
		});
	};//login

	$scope.register = function() {
		Authentication.register($scope.presenter)
		.then(function(presenter) {
			Authentication.login($scope.presenter);
			$location.path('/meeting');
		}).catch(function(error) {
			$scope.errormessage = error.message;
		});
	};//register

});//RegistrationController