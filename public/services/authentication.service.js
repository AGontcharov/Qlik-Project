angular
	.module('qlik')
	.factory('authentication', ['$cookies', '$location', 'session', function($cookies, $location, session) {

	var authentication = {};

	authentication.createSession = function(user) {

		// Initialize cookie
		var cookie = {
			username: user.username,
			role: user.role
		};

		// Create user session
		$cookies.put('user', JSON.stringify(cookie));
		session.create(cookie.username, cookie.role);
	}

	authentication.refreshSession = function() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
			console.log('cookie:', cookie);
			session.create(cookie.username, cookie.role);
		}
		console.log(session);
	}

	authentication.isAuthenticated = function() {
		return !!session.user;
	};

	authentication.logout = function() {
		session.destroy();
		$cookies.remove('user');
		$location.path('/login');
	};

	return authentication;
}]);