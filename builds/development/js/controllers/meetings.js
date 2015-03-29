myApp.controller('MeetingsController', function($scope, $rootScope, $firebaseArray) {

	var ref = new Firebase('https://pollit.firebaseio.com/meetings/users/' + $rootScope.currentUser.$getKey + '/meetings');
	var meetings = $firebaseArray(ref);
	$scope.meetings = meetings;

	console.log($rootScope.currentUser.$getKey);

	$scope.addMeeting = function() {
		meetings.$add({
			name: $scope.meetingname,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function() {
			$scope.meetingname = '';
		});
	};//addmeeting

	$scope.deleteMeeting = function(key) {
		meetings.$remove(key);
	};//deletemeeting

}); //MeetingsController