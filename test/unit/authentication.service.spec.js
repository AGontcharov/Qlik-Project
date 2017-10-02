describe('Authentication Service', function() {

	beforeEach(module('app.auth'));

	var authentication, $rootScope, $cookies, $location, session;

	beforeEach(inject(function(_authentication_, _$rootScope_, _$cookies_, _$location_, _session_) {
		authentication = _authentication_;
		$rootScope = _$rootScope_;
		$cookies = _$cookies_;
		$location = _$location_;
		session = _session_;
	}));

	describe('Create session', function() {

		var user;

		beforeEach(function() {
			user = { username: 'Qlik' };			
		});

		it ('Should store a cookie', function() {
			spyOn($cookies, 'put');
			authentication.createSession(user);

			// cookies
			expect($cookies.put).toHaveBeenCalled();
			expect($cookies.put.calls.count()).toBe(1);
		});
		
		it ('Should create a session', function() {
			spyOn(session, 'create');
			authentication.createSession(user);

			// session
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(1);

			// authentication.logout();
		});

		it ('Should redirect the user to the home page', function() {
			spyOn($location, 'path').and.callThrough();
			authentication.createSession(user);

			expect($location.path).toHaveBeenCalled();
			expect($location.path.calls.count()).toBe(1);
			expect($location.path()).toBe('/home');
		});
	});

	describe('Refresh session', function() {

		beforeEach(function() {
			spyOn($cookies, 'get').and.callThrough();
			spyOn(session, 'create').and.callThrough();
		});

		it('Should not refresh session if cookie is not found', function() {
			var cookie;			
			authentication.refreshSession();

			expect(cookie).toBeUndefined;
			expect(session.create).not.toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(0);
		});

		it('Should refresh session if cookie is found', function() {
			
			// Create custom cookie
			var mockCookie = {
				username: 'test',
				role: 'GUEST',
			};

			$cookies.put('user', JSON.stringify(mockCookie));
			authentication.refreshSession();

			// $cookie
			expect($cookies.get).toHaveBeenCalled();
			expect($cookies.get.calls.count()).toBe(2);

			// session
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(1);
		});
	});

	describe('Is authenticated', function() {
		
		it('Should return false if session is not active', function() {
			session.user = '';
			authentication.isAuthenticated();
			expect(session.user).toBeFalsy();
		});

		it('Should return true if session is active', function() {
			session.user = 'Qlik';
			authentication.isAuthenticated();
			expect(session.user).toBeTruthy();
		});
	});

	describe('Logout', function() {
		
		it('Should destroy active session', function() {
			session.user = 'Qlik';
			session.role = 'GUEST';

			// Assert session is defined
			expect(session.user).toBe('Qlik');
			expect(session.role).toBe('GUEST');

			// Assert session is destroyed
			authentication.logout();
			expect(session.user).toBeFalsy();
			expect(session.role).toBeFalsy();
		});

		it('Should remove active cookie', function() {
			
			// Create custom cookie
			var cookie = {
				username: 'test',
				role: 'GUEST',
			};

			// Assert cookie is defined
			$cookies.put('user', JSON.stringify(cookie));
			expect($cookies.get('user')).toBeTruthy();
			expect(JSON.parse($cookies.get('user'))).toEqual(cookie);

			// Assert cookie is removed
			authentication.logout();
			expect($cookies.get('user')).toBeFalsy();
		});

		it('Should redirect the user to the logout page', function() {
			spyOn($location, 'path').and.callThrough();
			authentication.logout();

			expect($location.path).toHaveBeenCalled();
			expect($location.path.calls.count()).toBe(1);
			expect($location.path()).toBe('/login');
		});
	});
});