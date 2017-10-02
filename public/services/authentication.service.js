angular
	.module('app.auth')
	.factory('authentication', ['$cookies', '$location', 'session', authentication]);

function authentication($cookies, $location, session) {

	var authentication = {};

	authentication.createSession = function(user) {

		// Initialize cookie
		var cookie = {
			username: user.username,
			role: 'GUEST'
		};

		// Create user session
		$cookies.put('user', JSON.stringify(cookie));
		session.create(cookie.username, cookie.role);
		$location.path('/home');
	}

	authentication.refreshSession = function() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
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
}