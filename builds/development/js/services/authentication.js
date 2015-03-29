myApp.factory('Authentication', function($firebaseArray, $firebaseObject, $rootScope, $firebaseAuth, $routeParams, $location) {

	var ref  = new Firebase('https://pollit.firebaseio.com/');
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if (authUser) {
			var ref = new Firebase('https://pollit.firebaseio.com/users/' + authUser.uid);
			var user = $firebaseArray(ref);
			$rootScope.currentUser = user;
			console.log(user);
		} else {
			$rootScope.currentUser = '';
		}
	});

	//Temporary object
	var myObject = {

		login: function(user) {
			return auth.$authWithPassword({
				email: user.email, 
				password: user.password
			}); //authWithPassword
		}, //login

		logout: function(user) {
			return auth.$unauth();
		}, //login

		register: function(user) {
			return auth.$createUser({
				email: user.email, 
				password: user.password
			}).then(function(regUser) {
				var ref = new Firebase('https://pollit.firebaseio.com/users');
				var firebaseUsers = $firebaseArray(ref);

				firebaseUsers.$add({
					date	  	: Firebase.ServerValue.TIMESTAMP,
					regUser 	: regUser.uid,
					firstname	: user.firstName,
					lastname	: user.lastName,
					email			: user.email
				});
			}); //promise
		}, //register

		requireAuth: function() {
			return auth.$requireAuth();
		}, //requireauth

		requireForAuth: function() {
			return auth.$waitForAuth();
		} //wait until user is authenticated

	};
	return myObject;
}); //myApp Factory