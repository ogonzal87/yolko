myApp.controller('MeetingController', function($scope, $rootScope, $firebaseArray) {

	//FIREBASE REFERENCE
  var firebaseUrl = 'https://pollit.firebaseio.com/';

  // GET CLICKS AS ARRAY
  $scope.voteUps   = $firebaseArray(new Firebase(firebaseUrl + '/voteUps'));
  $scope.voteDowns = $firebaseArray(new Firebase(firebaseUrl + '/voteDowns'));


  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
  }

  $scope.voteDown = function() {
    $scope.voteDowns.$add(1).then(function() {
      $scope.voteDowns.$remove();
    });
  }

 // voteUps Counter
  $scope.voteUps.$watch(function() {
    $rootScope.howManyVoteUps = $scope.voteUps.length;
    $scope.delta = $rootScope.howManyVoteUps - $rootScope.howManyVoteDowns;
  }); //counter

 // voteNeutral Counter
  $scope.voteDowns.$watch(function() {
    $rootScope.howManyVoteDowns = $scope.voteDowns.length;
    $scope.delta = $rootScope.howManyVoteUps - $rootScope.howManyVoteDowns;
  }); //counter

  $scope.message = function() {
    if ($scope.delta < 0) {
        $scope.bad = 'You are doing Bad!!!!!';
      } else {
        $scope.good = 'You are doing Great!';
      };
  } //message

  //math function



}); //MeetingController