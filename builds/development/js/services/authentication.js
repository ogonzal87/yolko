myApp.factory('Authentication', function($firebase, $firebaseAuth, $routeParams, $location) {

	var ref  = new Firebase('https://pollit.firebaseio.com/');
	var auth = $firebaseAuth(ref);

	//Temporary object
	var myObject = {

		login: function(user) {
			return auth.$authWithPassword({
				email: user.email, 
				password: user.password
			}); //authWithPassword
		}, //login

		register: function(user) {
			return auth.$createUser({
				email: user.email, 
				password: user.password
			});
		}//register
	};
	return myObject;
}); //myApp Factory