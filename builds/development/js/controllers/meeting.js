myApp.controller('MeetingController', function($timeout, FIREBASE_URL, $scope, $firebaseObject, $firebaseArray) {

  // GET CLICKS AS ARRAY
  $scope.voteUps   = $firebaseArray(new Firebase(FIREBASE_URL + '/voteUps'));
  $scope.voteDowns = $firebaseArray(new Firebase(FIREBASE_URL + '/voteDowns'));
  $scope.questions  = $firebaseArray(new Firebase(FIREBASE_URL + '/questions'));

  updateMessage();

  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
    $scope.voteUpDisabled = true;

    var enableSwitch = function() {
      $scope.voteUpDisabled = false;
    };
    $timeout(enableSwitch, 1000);
  };//switch back to active after 3 minutes


  $scope.voteDown = function() {
    $scope.voteDowns.$add(1);
    $scope.voteDownDisabled = true;

    var enableSwitch = function() {
      $scope.voteDownDisabled = false;
    };
    $timeout(enableSwitch, 1000);
  };//swich back to active after 3 minutes

 // voteUps Counter
  $scope.voteUps.$watch(function() {
    $scope.howManyVoteUps = $scope.voteUps.length;
    $scope.delta = $scope.howManyVoteUps - $scope.howManyVoteDowns;
    $scope.totalVotes = $scope.howManyVoteUps + $scope.howManyVoteDowns;
    $scope.failureRate = ($scope.howManyVoteDowns / $scope.totalVotes) * 100;
    updateMessage();
    displayYolko(); 
  });//counter

 // voteDowns Counter
  $scope.voteDowns.$watch(function() {
    $scope.howManyVoteDowns = $scope.voteDowns.length;
    $scope.delta = $scope.howManyVoteUps - $scope.howManyVoteDowns;
    $scope.totalVotes = $scope.howManyVoteUps + $scope.howManyVoteDowns;
    $scope.failureRate = ($scope.howManyVoteDowns / $scope.totalVotes) * 100;
    updateMessage(); 
    displayYolko(); 
  }); //counter

//Questions
  $scope.addQuestion = function(e) {
    if (e.keyCode === 13 && $scope.question) {
      $scope.questions.$add({ 
        question: $scope.question 
      });
      $scope.question = "";
    };
  };//questions


/*** UTILITY FUNCTIONS ***/

//Message to Presenter
  function updateMessage() {
    if ($scope.delta < 0) {
        $scope.message = 'Dude, I dont get this...';
      } else if ($scope.delta == 0) {
        $scope.message = 'You Good!';
      } else {
        $scope.message = 'You are doing Great!';
      };
  } //message



//Shapes and Colors
  $scope.green = true;
  function displayYolko() {
    $scope.green  = $scope.failureRate < 31 || null;
    $scope.red    = $scope.failureRate > 65;
    $scope.yellow = $scope.failureRate >= 32 && $scope.failureRate <= 64;
  }; //Show Color

    




  var anonFunc = function() {
    // console.log('helo')
  }
      anonFunc();

  namedFunc();
  function namedFunc() {
    // console.log('helo')
  }
}); //MeetingController