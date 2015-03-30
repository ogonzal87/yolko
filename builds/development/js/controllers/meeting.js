myApp.controller('MeetingController', function($scope, $rootScope, $firebaseArray) {

	//FIREBASE REFERENCE
  var firebaseUrl = 'https://pollit.firebaseio.com/';

  // GET CLICKS AS ARRAY
  $scope.voteUps = $firebaseArray(new Firebase(firebaseUrl + '/voteUps'));
  $scope.voteNeutrals = $firebaseArray(new Firebase(firebaseUrl + '/voteNeutrals'));
  $scope.voteDowns = $firebaseArray(new Firebase(firebaseUrl + '/voteDowns'));


  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
  }

  $scope.voteDown = function() {
    $scope.voteDowns.$add(1);
  }

 // voteUps Counter
  $scope.voteUps.$loaded(function(data) {
    $rootScope.howManyVoteUps = $scope.voteUps.length;
  });
  $scope.voteUps.$watch(function(data) {
    $rootScope.howManyVoteUps = $scope.voteUps.length;
  }); //counter

 // voteNeutral Counter
  $scope.voteDowns.$loaded(function(data) {
    $rootScope.howManyVoteDowns = $scope.voteDowns.length;
  });
  $scope.voteDowns.$watch(function(data) {
    $rootScope.howManyVoteDowns = $scope.voteDowns.length;
  }); //counter


$scope.delta = $watch($rootScope.howManyVoteUps - $rootScope.howManyVoteDowns);










}); //MeetingController