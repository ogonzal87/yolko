(function() {

	var presentaionController = function ($scope, $routeParams, currentUser) {
		$scope.params = currentUser;
	};

	myApp.controller('PresentationController',['$scope', '$routeParams', 'currentUser', presentaionController]);
})()

