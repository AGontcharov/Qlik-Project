angular
	.module('app.auth')
	.factory('authentication', ['$cookies', '$location', 'session', authentication]);

function authentication($cookies, $location, session) {

	var service = {
		createSession: createSession,
		refreshSession: refreshSession,
		isAuthenticated: isAuthenticated,
		logout: logout
	};

	return service;

	function createSession(user) {

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

	function refreshSession() {
		if ($cookies.get('user')) {
			var cookie = JSON.parse($cookies.get('user'));
			session.create(cookie.username, cookie.role);
		}
		console.log(session);
	}

	function isAuthenticated() {
		return !!session.user;
	};

	function logout() {
		session.destroy();
		$cookies.remove('user');
		$location.path('/login');
	};
}