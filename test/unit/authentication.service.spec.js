describe('Authentication Service', function() {

	beforeEach(module('app.auth'));

	var $rootScope, $cookies, $location, session, authentication;

	beforeEach(inject(function(_$rootScope_, _$cookies_, _$location_, _session_, _authentication_) {
		$rootScope = _$rootScope_;
		$cookies = _$cookies_;  
		$location = _$location_;
		authentication = _authentication_;
		session = _session_;

		// Spies
		spyOn($location, 'path').and.callThrough();
		spyOn($cookies, 'put');
		spyOn($cookies, 'get');
		spyOn($cookies, 'remove');
		spyOn(session, 'create');
		spyOn(session, 'destroy');
	}));

	describe('Create session', function() {

		var user;

		// Define user
		beforeEach(function() {
			user = { username: 'Qlik' };			
		});

		it('Should call the $cookies service', function() {
			authentication.createSession(user);

			// $cookies
			expect($cookies.put).toHaveBeenCalled();
			expect($cookies.put.calls.count()).toBe(1);
		});

		it('Should call the session service', function() {
			authentication.createSession(user);

			// session
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(1);
		});

		it('Should redirect the user to the home page', function() {
			authentication.createSession(user);

			// $location
			expect($location.path).toHaveBeenCalled();
			expect($location.path.calls.count()).toBe(1);
			expect($location.path()).toBe('/home');
		});
	});

	describe('Refresh session', function() {

		it('Should call the $cookies service', function() {
			authentication.refreshSession();

			// $cookies
			expect($cookies.get).toHaveBeenCalled();
			expect($cookies.get.calls.count()).toBe(1);
		});

		it('Should call the session service on stored cookie', function() {

			// Mock $cookies getter to return a JSON object
			$cookies.get = jasmine.createSpy().and.returnValue('{"username": "Qlik", "role": "GUEST"}');
			authentication.refreshSession();

			// session
			expect(session.create).toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(1);
		});

		it('Should not call the session service if no cookie is stored', function() {
			authentication.refreshSession();

			// session
			expect(session.create).not.toHaveBeenCalled();
			expect(session.create.calls.count()).toBe(0);
		});

	});

	describe('Is authenticated', function() {

		it('Should return true if session is defined', function() {
			session.user = 'Qlik';
			expect(authentication.isAuthenticated()).toBeTruthy();
		});

		it('Should return false if session is undefined', function() {
			session.user = '';
			expect(authentication.isAuthenticated()).toBeFalsy();;
		});
	});

	describe('Logout', function() {

		it('Should call the session service', function() {
			authentication.logout();

			// session
			expect(session.destroy).toHaveBeenCalled();
			expect(session.destroy.calls.count()).toBe(1);
		});

		it('Should call the $cookies service', function() {
			authentication.logout();

			// $cookies
			expect($cookies.remove).toHaveBeenCalled();
			expect($cookies.remove.calls.count()).toBe(1);
		});

		it('Should redirect the user to the login page', function() {
			authentication.logout();

			// $location
			expect($location.path).toHaveBeenCalled();
			expect($location.path.calls.count()).toBe(1);
			expect($location.path()).toBe('/login');
		});
	});
});