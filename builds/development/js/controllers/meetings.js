myApp.controller('MeetingsController', function($scope, $firebaseArray) {

	var ref = new Firebase('https://pollit.firebaseio.com/meetings');
	var meetings = $firebaseArray(ref);
	$scope.meetings = meetings;

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