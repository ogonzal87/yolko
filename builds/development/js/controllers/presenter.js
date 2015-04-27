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
    $scope.speedPercent = speed(Math.round((speedValue / numAttendees) * 100));
  //SPEED END
  ///////////////////////////////////////////////////////////////////////////

  //VOLUME
  ///////////////////////////////////////////////////////////////////////////
    var volumeUpAttendees = _.filter($scope.attendees, function(attendee) {
      return attendee.volumeUp == "yes";
    });
    $scope.volumeUpAttendees = volumeUpAttendees.length;
    $scope.numAttendees = numAttendees;
    $scope.volumeUpPercent = volume(Math.round((volumeUpAttendees.length / numAttendees) * 100));
  //VOLUME END
  ///////////////////////////////////////////////////////////////////////////

  //FEELING
  ///////////////////////////////////////////////////////////////////////////
    var feelingValues = _.filter($scope.attendees, function(attendee) {
      return attendee.feeling == "panic";
    });
    $scope.feelingValues = feelingValues.length;
    $scope.numAttendees = numAttendees;
    $scope.panicPercent = panic(Math.round((feelingValues.length / numAttendees) * 100));
  //FEELING END
  ///////////////////////////////////////////////////////////////////////////

  //QUESTIONS
  ///////////////////////////////////////////////////////////////////////////
  $scope.questions = [];
  _.each($scope.attendees, function(attendee) {
    _.each(attendee.questions, function(question) {
     $scope.questions.push({ content: question.content, name: attendee.name });
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
    $scope.burnt              = $scope.dislikePercent >= 81;
    $scope.indifferent        = $scope.dislikePercent >= 61 && $scope.dislikePercent <= 80.99999999999999;
    $scope.startingtonotgetit = $scope.dislikePercent >= 41 && $scope.dislikePercent <= 60.99999999999999;
    $scope.want               = $scope.dislikePercent >= 21 && $scope.dislikePercent <= 40.99999999999999;
    $scope.laughing           = $scope.dislikePercent >= 1 && $scope.dislikePercent <= 20.99999999999999;
    $scope.zzz                = $scope.dislikePercent < 1;
  } //Displaying Yolko

// Displaying Message
  function updateMessage() {
    if ($scope.failureRate >= 80) {
      $scope.message = 'The mayority of the audience do not like the presentation. Ask them why?';
    } else if ($scope.dislikePercent >= 60) {
      $scope.message = 'You are losing them! More than half do not like the topic. Try something different!'; //beaten
    } else if ($scope.dislikePercent >= 40) {
      $scope.message = 'Be careful! You are entering the DANGER ZONE. Try engaging the audience!';//burnt
    } else if ($scope.dislikePercent >= 20) {
      $scope.message = 'You are doing great but I know you can do better! Fire a Pop Quiz Question!';//burnt
    } else {
      $scope.message = 'Dude, you are killing it out there. Keep doing your thang!';
    }
  } // Displaying Message

    function speed(percent) {
      if (percent > 20) {
        return { value: percent, content: 'Too Slow!', class: 'panel-dashboard-bad' };
      } else if (percent > 10) {
        return { value: percent, content: 'Go Faster', class: 'panel-dashboard-middle' };
      } else if (percent < -20) {
        return { value: percent, content: 'Too Fast!', class: 'panel-dashboard-bad' };
      } else if (percent < -10) {
        return { value: percent, content: 'Go Slower', class: 'panel-dashboard-middle' };
      } else {
        return { value: percent, content: 'Just Fine', class: 'panel' };
      }
    }

    function volume(percent) {
      if (percent > 10) {
        return { value: percent, content: percent, class: 'panel-dashboard-bad' };
      } else {
        return { value: percent, content: percent, class: 'panel' };
      }
    }

    function panic(percent) {
      if (percent > 25) {
        return { content: percent, class: 'panel-dashboard-bad' };
      } else {
        return { content: percent, class: 'panel' };
      }
    }

// ============================ RESET ================================


  $scope.resetVolumeTraceker = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.volumeUp = 'no';
      $scope.attendees.$save(attendee);
    });
  };

  $scope.resetSpeedTracker = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.speed = 0;
      $scope.attendees.$save(attendee);
    });
  };

  $scope.resetYolko = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.vote = 'like';
      $scope.attendees.$save(attendee);
    });
  };

  $scope.resetPanicTracker = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.feeling = 'fine';
      $scope.attendees.$save(attendee);
    });
  };

 $scope.resetEverything = function() {
    _.each($scope.attendees, function(attendee) {
      attendee.feeling = 'fine';
      attendee.speed = 0;
      attendee.volumeUp = 0;
      attendee.vote = 'like';
      $scope.attendees.$save(attendee);
      var refArrayQuestions = new Firebase(FIREBASE_URL + '/attendees/' + attendee.key + '/questions');
      refArrayQuestions.remove();
    });
  };

  $scope.deleteEverything = function() {
   refArrayAllAttendees.remove();
  };

});//PresenterController
