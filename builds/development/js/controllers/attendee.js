myApp
.controller('AttendeeController', function(FIREBASE_URL, $scope, $firebaseObject, $firebaseArray) {


// On load
  var refArrayAllAttendees = new Firebase(FIREBASE_URL + "/attendees");
  $scope.attendees = $firebaseArray(refArrayAllAttendees);

// CREATE DEFAULT ATTENDEE ON PAGE ARRIVAL
  var randomKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  var defaultAttendee = { feeling: 'fine', speed: 0, volumeUp: 'no', key: randomKey, vote: "like" };
  var refObject = new Firebase(FIREBASE_URL + '/attendees/' + defaultAttendee.key);
  var syncObject = $firebaseObject(refObject);
  refObject.set(defaultAttendee); //Creates the attendee on page arrival
  syncObject.$bindTo($scope, "attendee");

// LOAD QUESTIONS
  var refArrayQuestions = new Firebase(FIREBASE_URL + '/attendees/' + defaultAttendee.key + '/questions');
  $scope.questions = $firebaseArray(refArrayQuestions);


//QUESTIONS
/////////////////////////////////////////////////////////////////////////
//ASKING A QUESTIONS TO THE PRESENTER
  $scope.addQuestionKeyDown = function(event) {
    if (event.keyCode === 13 && $scope.questionContent) {
      $scope.questions.$add({
        content: $scope.questionContent
      });
      $scope.questionContent = "";
    }
  };//questions

  $scope.addQuestionClick = function() {
     $scope.questions.$add({
       content: $scope.questionContent
     });
     $scope.questionContent = "";
   };//questions

   $scope.removeQuestion = function(key) {
    $scope.questions.$remove(key);
  };
//QUESTIONS END
///////////////////////////////////////////////////////////////////////////


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

  updateMessage();
  displayYolko();
  }, true);

// Panic Button Logic
  $scope.panicButton = function(attendee) {
    if ($scope.attendee.feeling == "fine") {
      $scope.attendee.feeling = "panic";
    } else if ($scope.attendee.feeling == "panic") {
      $scope.attendee.feeling = "fine";
    }
   };// Panic Button Logic


  // // ======================** UTILITY FUNCTIONS **===================================

//Displaying Yolko
  $scope.zzz = true;
  function displayYolko() {
    $scope.burnt              = $scope.dislikePercent >= 76;
    $scope.shocked            = $scope.dislikePercent >= 64 && $scope.dislikePercent <= 75.999999999999;
    $scope.idontgetit         = $scope.dislikePercent >= 56 && $scope.dislikePercent <= 63.999999999999;
    $scope.startingtonotgetit = $scope.dislikePercent >= 48 && $scope.dislikePercent <= 55.999999999999;
    $scope.tastey             = $scope.dislikePercent >= 40 && $scope.dislikePercent <= 47.999999999999;
    $scope.want               = $scope.dislikePercent >= 32 && $scope.dislikePercent <= 39.999999999999;
    $scope.confident          = $scope.dislikePercent >= 24 && $scope.dislikePercent <= 31.999999999999;
    $scope.igotthis           = $scope.dislikePercent >= 16 && $scope.dislikePercent <= 23.999999999999;
    $scope.badass             = $scope.dislikePercent >= 8 && $scope.dislikePercent <= 15.999999999999;
    $scope.zzz                = $scope.dislikePercent < 7.999999999999 || null;
  } //Displaying Yolko

  // Displaying Message
  function updateMessage() {
  if ($scope.dislikePercent >= 64) {
      $scope.message = '';//burnt
    } else if ($scope.dislikePercent >= 56) {
      $scope.message = 'I am kinda lost here...';//lost
    } else if ($scope.dislikePercent >= 48) {
      $scope.message = 'I like the presentation... I am just not feeling the subject that much...';//strating to not get it
    } else if ($scope.dislikePercent >= 40) {
      $scope.message = "I'm happy to be here"; //tasty
    } else if ($scope.dislikePercent >= 32) {
      $scope.message = "I'm feeling this. Want more!"; //want
    } else if ($scope.dislikePercent >= 24) {
      $scope.message = "I can hear my IQ increasing"; //confident
    } else if ($scope.dislikePercent >= 16) {
      $scope.message = "Is the presenter killing it or what..?! That's ma man right ther!"; //igotthis
    } else if ($scope.dislikePercent >= 8) {
      $scope.message = "I'm feeling so badass right now!"; //badass
    } else {
      $scope.message = "ZZZZZZZ"; //ZZZ
    }
  } // Displaying Message


});//ATTENDEE CONTROLLER
