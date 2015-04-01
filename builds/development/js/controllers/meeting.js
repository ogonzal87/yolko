myApp.controller('MeetingController', function(FIREBASE_URL, $scope, $rootScope, $firebaseObject, $firebaseArray) {

	//FIREBASE REFERENCE
  // var firebaseRef = 'https://pollit.firebaseio.com/';

  // GET CLICKS AS ARRAY
  $scope.voteUps   = $firebaseArray(new Firebase(FIREBASE_URL + '/voteUps'));
  $scope.voteDowns = $firebaseArray(new Firebase(FIREBASE_URL + '/voteDowns'));

  updateMessage();

  console.log($scope.voteUps);
  console.log($scope.voteDowns);

  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
  }

  $scope.voteDown = function() {
    $scope.voteDowns.$add(1)
  }

 // voteUps Counter
  $scope.voteUps.$watch(function() {
    $rootScope.howManyVoteUps = $scope.voteUps.length;
    $scope.delta = $rootScope.howManyVoteUps - $rootScope.howManyVoteDowns;
    updateMessage();
  }); //counter

 // voteNeutral Counter
  $scope.voteDowns.$watch(function() {
    $rootScope.howManyVoteDowns = $scope.voteDowns.length;
    $scope.delta = $rootScope.howManyVoteUps - $rootScope.howManyVoteDowns;
    updateMessage();
  }); //counter

  /*** UTILITY FUNCTIONS ***/
  function updateMessage() {
    if ($scope.delta < 0) {
        $scope.message = 'You are doing Bad!!!!!';
      } else if ($scope.delta == 0) {
        $scope.message = 'You Good!';
      } else {
        $scope.message = 'You are doing Great!';
      };
  } //message

  //math function

  var anonFunc = function() {
  }
    anonFunc();


  namedFunc();
  function namedFunc() {

  }


}); //MeetingController