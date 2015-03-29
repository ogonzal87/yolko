myApp.controller('MeetingController', function($scope, $rootScope, $firebaseArray) {

	//FIREBASE REFERENCE
  var firebaseUrl = 'https://pollit.firebaseio.com/';

  // GET CLICKS AS ARRAY
  $scope.voteUps = $firebaseArray(new Firebase(firebaseUrl + '/voteUps'));
  $scope.voteNeutrals = $firebaseArray(new Firebase(firebaseUrl + '/voteNeutrals'));
  $scope.voteDowns = $firebaseArray(new Firebase(firebaseUrl + '/voteDowns'));


  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
    console.log('There are ' + ($scope.voteUps.length+1) + ' voteUps!');
  }

  $scope.neutral = function() {
    $scope.voteNeutrals.$add(0);
    console.log('There are ' + ($scope.voteNeutrals.length+1) + ' voteNeutrals!');
  }

  $scope.voteDown = function() {
    $scope.voteDowns.$add(-1);
    console.log('There are ' + ($scope.voteDowns.length+1) + ' voteDowns');
    console.log(($scope.voteUps.length) - ($scope.voteDowns.length));
  }

}); //MeetingController