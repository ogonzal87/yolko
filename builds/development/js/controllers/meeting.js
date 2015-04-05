myApp.controller('MeetingController', function($timeout, FIREBASE_URL, $scope, $firebaseObject, $firebaseArray) {

  // GET CLICKS AS ARRAY
  var voteUpAll    = new Firebase(FIREBASE_URL + '/voteUps');
  var voteDownAll  = new Firebase(FIREBASE_URL + '/voteDowns');
  var questionsAll = new Firebase(FIREBASE_URL + '/questions');
  // var questionRef  = new Firebase(FIREBASE_URL + '/questions/' + question.id);
  $scope.voteUps   = $firebaseArray(new Firebase(FIREBASE_URL + '/voteUps'));
  $scope.voteDowns = $firebaseArray(new Firebase(FIREBASE_URL + '/voteDowns'));
  $scope.questions = $firebaseArray(new Firebase(FIREBASE_URL + '/questions'));

  updateMessage();

  $scope.voteUp = function() {
    $scope.voteUps.$add(1);
    // $scope.voteUpDisabled = true;

    var enableSwitch = function() {
      $scope.voteUpDisabled = false;
    };
    $timeout(enableSwitch, 1000);
  };//switch back to active after 3 minutes


  $scope.voteDown = function() {
    $scope.voteDowns.$add(1);
    // $scope.voteDownDisabled = true;

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
  $scope.addQuestionKeyDown = function(e) {
    if (e.keyCode === 13 && $scope.question) {
      $scope.questions.$add({ 
        question: $scope.question 
      });
      $scope.question = "";
    };
  };//questions

  $scope.addQuestionClick = function() {
    $scope.questions.$add({ 
      question: $scope.question 
    });
    $scope.question = "";
  };//questions


/*** UTILITY FUNCTIONS ***/

//Message to Presenter
  // function updateMessage() {
  //   if ($scope.delta < 0) {
  //       $scope.message = 'Dude, I dont get this...';
  //     } else if ($scope.delta == 0) {
  //       $scope.message = 'You Good!';
  //     } else {
  //       $scope.message = 'Dude, you are killing it out there. Do your thang!';
  //     };
  // } //message

//Displaying Yolko
  $scope.zzz = true;
  function displayYolko() {
    $scope.zzz                   = $scope.failureRate < 7 || null;
    $scope.burnt                 = $scope.failureRate >= 96; 
    $scope.laughing              = $scope.failureRate >= 8 && $scope.failureRate <= 15;
    $scope.igotthis              = $scope.failureRate >= 16 && $scope.failureRate <= 23;
    $scope.easy                  = $scope.failureRate >= 24 && $scope.failureRate <= 31;
    $scope.easywhereisthefood    = $scope.failureRate >= 32 && $scope.failureRate <= 39;
    $scope.yum                   = $scope.failureRate >= 40 && $scope.failureRate <= 47;
    $scope.startingtonotgetit    = $scope.failureRate >= 48 && $scope.failureRate <= 55;
    $scope.idontgetit            = $scope.failureRate >= 56 && $scope.failureRate <= 63;
    $scope.shocked               = $scope.failureRate >= 64 && $scope.failureRate <= 71;
    $scope.fire                  = $scope.failureRate >= 72 && $scope.failureRate <= 79;
    $scope.beaten                = $scope.failureRate >= 80 && $scope.failureRate <= 87;
    $scope.burnt                 = $scope.failureRate >= 88 && $scope.failureRate <= 95;
  }; //Displaying Yolko

    function updateMessage() {
    if ($scope.failureRate < 7 || null) {
        $scope.message = 'ZZZ'; //ZZZ
      } else if ($scope.failureRate >= 96) {
        $scope.message = ''; //burnt
      } else if ($scope.failureRate >= 8 && $scope.failureRate <= 15) {
        $scope.message = 'Mmm... This is too easy'; //laughing
      } else if ($scope.failureRate >= 16 && $scope.failureRate <= 23) {
        $scope.message = 'Dude, you are killing it out there. Do your thang!'; // igotthis
      } else if ($scope.failureRate >= 24 && $scope.failureRate <= 31) {
        $scope.message = 'I feel like partying... Are you with me?'; //easy
      } else if ($scope.failureRate >= 32 && $scope.failureRate <= 39) {
        $scope.message = 'HTML? Too easy, where is the food...?'; // easywhereisthefood
      } else if ($scope.failureRate >= 40 && $scope.failureRate <= 47) {
        $scope.message = 'Yummmm'; //yum
      } else if ($scope.failureRate >= 48 && $scope.failureRate <= 55) {
        $scope.message = 'Psh, is he still speaking English?';//startingtonotgetit
      } else if ($scope.failureRate >= 56 && $scope.failureRate <= 63) {
        $scope.message = 'Yep, I am lost';//idontgetit
      } else if ($scope.failureRate >= 64 && $scope.failureRate <= 71) {
        $scope.message = 'RSPEC...Wahhhh?';//shocked
      } else if ($scope.failureRate >= 72 && $scope.failureRate <= 79) {
        $scope.message = ''; //fire
      } else if ($scope.failureRate >= 80 && $scope.failureRate <= 87) {
        $scope.message = 'Imma walk it out'; //beaten
      } else if ($scope.failureRate >= 88 && $scope.failureRate <= 95) {
        $scope.message = '';//burnt
      };
  }

  $scope.deleteAllVotes = function() {
    voteUpAll.remove();
    voteDownAll.remove();
  };

  $scope.deleteAllQuestions = function() {
    questionsAll.remove();
  };


  $scope.removeQuestion = function(key) {
    $scope.questions.$remove(key);
  };

}); //MeetingController