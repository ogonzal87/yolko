myApp
.controller('PresenterController', function(FIREBASE_URL, $scope, $firebaseObject, $firebaseArray) {

// On load
  var refArrayAllAttendees = new Firebase(FIREBASE_URL + "/attendees");
  $scope.attendees = $firebaseArray(refArrayAllAttendees);

//+++++++++++++++++++++++++++++++++//FIREBASE WATCHING ALL EVENTS+++++++++++++++++++++++++++++++//
  $scope.$watch('attendees', function(newVal, oldVal) {
    var numAttendees = $scope.attendees.length;

  //VOTES
  ///////////////////////////////////////////////////////////////////////////
    var dislikeVotesAttendees = _.filter($scope.attendees, function(attendee) {
      return attendee.vote == "dislike";
    });
    $scope.dislikeVotesAttendees = dislikeVotesAttendees.length;
    $scope.numAttendees = numAttendees;
    $scope.dislikePercent = Math.round((dislikeVotesAttendees.length / numAttendees) * 100);
  //VOTES END
  ///////////////////////////////////////////////////////////////////////////

  //SPEED
  ///////////////////////////////////////////////////////////////////////////
    var speedValue = _.reduce($scope.attendees, function(memo, attendee) {
      return memo + attendee.speed;
    }, 0);
    $scope.speedValue = speedValue;
    $scope.numAttendees = numAttendees;
    $scope.speedStatus = Math.round((speedValue / numAttendees) * 100);
  //SPEED END
  ///////////////////////////////////////////////////////////////////////////

  //VOLUME
  ///////////////////////////////////////////////////////////////////////////
    var volumeUpAttendees = _.filter($scope.attendees, function(attendee) {
      return attendee.volumeUp == "yes";
    });
    $scope.volumeUpAttendees = volumeUpAttendees.length;
    $scope.numAttendees = numAttendees;
    $scope.volumeUpPercent = Math.round((volumeUpAttendees.length / numAttendees) * 100);
  //VOLUME END
  ///////////////////////////////////////////////////////////////////////////

  //FEELING
  ///////////////////////////////////////////////////////////////////////////
    var feelingValues = _.filter($scope.attendees, function(attendee) {
      return attendee.feeling == "panic";
    });
    $scope.feelingValues = feelingValues.length;
    $scope.numAttendees = numAttendees;
    $scope.panicPercent = Math.round((feelingValues.length / numAttendees) * 100);
  //FEELING END
  ///////////////////////////////////////////////////////////////////////////

  //QUESTIONS
  ///////////////////////////////////////////////////////////////////////////
  $scope.questions = [];
  _.each($scope.attendees, function(attendee) {
    _.each(attendee.questions, function(question) {
     $scope.questions.push({ content: question.content, name: attendee.name })
    });
  });
  //QUESTIONS END
  ///////////////////////////////////////////////////////////////////////////


  displayYolko(); //watching for this utility function
  updateMessage(); //watching for this utility function
  }, true);



  // // ======================** UTILITY FUNCTIONS **===================================

//Displaying Yolko
  $scope.zzz = true;
  function displayYolko() {
    $scope.zzz                   = $scope.dislikePercent < 7.999999999999 || null;
    $scope.burnt                 = $scope.dislikePercent >= 96;
    $scope.laughing              = $scope.dislikePercent >= 8 && $scope.dislikePercent <= 15.999999999999;
    $scope.igotthis              = $scope.dislikePercent >= 16 && $scope.dislikePercent <= 23.999999999999;
    $scope.easy                  = $scope.dislikePercent >= 24 && $scope.dislikePercent <= 31.999999999999;
    $scope.easywhereisthefood    = $scope.dislikePercent >= 32 && $scope.dislikePercent <= 39.999999999999;
    $scope.yum                   = $scope.dislikePercent >= 40 && $scope.dislikePercent <= 47.999999999999;
    $scope.startingtonotgetit    = $scope.dislikePercent >= 48 && $scope.dislikePercent <= 55.999999999999;
    $scope.idontgetit            = $scope.dislikePercent >= 56 && $scope.dislikePercent <= 63.999999999999;
    $scope.shocked               = $scope.dislikePercent >= 64 && $scope.dislikePercent <= 71.999999999999;
    $scope.fire                  = $scope.dislikePercent >= 72 && $scope.dislikePercent <= 79.999999999999;
    $scope.beaten                = $scope.dislikePercent >= 80 && $scope.dislikePercent <= 87.999999999999;
    $scope.burnt                 = $scope.dislikePercent >= 88 && $scope.dislikePercent <= 95.999999999999;
  } //Displaying Yolko

  // Displaying Message
    function updateMessage() {
    if ($scope.dislikePercent < 7.999999999999 || null) {
        $scope.message = 'ZZZ'; //ZZZ
      } else if ($scope.failureRate >= 96) {
        $scope.message = ''; //burnt
      } else if ($scope.dislikePercent >= 8 && $scope.dislikePercent <= 15.999999999999) {
        $scope.message = 'Mmm... This is too easy'; //laughing
      } else if ($scope.dislikePercent >= 16 && $scope.dislikePercent <= 23.999999999999) {
        $scope.message = 'Dude, you are killing it out there. Do your thang!'; // igotthis
      } else if ($scope.dislikePercent >= 24 && $scope.dislikePercent <= 31.999999999999) {
        $scope.message = 'I feel like partying... Are you with me?'; //easy
      } else if ($scope.dislikePercent >= 32 && $scope.dislikePercent <= 39.999999999999) {
        $scope.message = 'HTML? Too easy, where is the food...?'; // easywhereisthefood
      } else if ($scope.dislikePercent >= 40 && $scope.dislikePercent <= 47.999999999999) {
        $scope.message = 'Yummmm'; //yum
      } else if ($scope.dislikePercent >= 48 && $scope.dislikePercent <= 55.999999999999) {
        $scope.message = 'Psh, are you getting what he is saying?';//startingtonotgetit
      } else if ($scope.dislikePercent >= 56 && $scope.dislikePercent <= 63.999999999999) {
        $scope.message = 'Yep, I am lost..';//idontgetit
      } else if ($scope.dislikePercent >= 64 && $scope.dislikePercent <= 71.999999999999) {
        $scope.message = 'RSPEC...Wahhhh?';//shocked
      } else if ($scope.dislikePercent >= 72 && $scope.dislikePercent <= 79.999999999999) {
        $scope.message = '';
      } else if ($scope.failureRate >= 80 && $scope.dislikePercent <= 87.999999999999) {
        $scope.message = 'Imma walk it out'; //beaten
      } else if ($scope.dislikePercent >= 88 && $scope.dislikePercent <= 95.999999999999) {
        $scope.message = '';//burnt
      };
  } // Displaying Message






// ============================ RESET ================================

 $scope.resetEverything = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.feelings = 'good';
      attendee.speed = 0;
      attendee.volume = 0;
      attendee.vote = 'like';
      $scope.attendees.$save(attendee);
      var refArrayQuestions = new Firebase(FIREBASE_URL + '/attendees/' + attendee.key + '/questions');
      refArrayQuestions.remove()
    });
  };

  $scope.resetYolko = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.vote = 'like';
      $scope.attendees.$save(attendee);
    });
  };

  $scope.resetVolume = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.volumeUp = 'no';
      $scope.attendees.$save(attendee);
    });
  };

  $scope.deleteEverything = function() {
   refArrayAllAttendees.remove();
  };

});//PresenterController
