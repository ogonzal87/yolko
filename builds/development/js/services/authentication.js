myApp.factory('Authentication', function(FIREBASE_URL, $rootScope,$firebaseObject, $firebaseArray, $firebase, $firebaseAuth, $routeParams, $location) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authPresenter) {
		if (authPresenter) {
			// var id = ref.key();
			var ref = new Firebase(FIREBASE_URL + '/presenters/' + authPresenter.uid)
			var presenter = $firebaseArray(ref)
			$rootScope.currentPresenter = presenter;
		} else {
			$rootScope.currentPresenter = '';
		};
	});

	//TEmporary Object
	var myObject = {

		login: function(presenter) {
			return auth.$authWithPassword({
				email: presenter.email,
				password: presenter.password
			}); //authWith
		}, //login

		register: function(presenter) {
			return auth.$createUser({
				email: presenter.email,
				password: presenter.password,
			}).then(function(regPresenter) {
				var ref = new Firebase(FIREBASE_URL+'presenters');
				var firebasePresenters = $firebaseArray(ref);

				var presenterInfo = {
					date: Firebase.ServerValue.TIMESTAMP, 
					regPresenter: regPresenter.uid, 
					name: presenter.name,
					email: presenter.email,
					presentations: {}
				}; //presenter Info

				firebasePresenters.$add(presenterInfo).then(function(ref) {
					var id = ref.key();
					console.log("added record with id " + id);
					firebasePresenters.$indexFor(id);
				});
			});
		} //register

	}; //my object 
	return myObject
});

var presentation = function(name, accessKey) {
	var presentation = {};

	presentation.name = name;
	presentation.accessKey = accessKey;
	presentation.votesUp = 0;
	presentation.votesDown = 0;
	
	return presentation;
}