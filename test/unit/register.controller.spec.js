describe('Register Controller', function() {

	beforeEach(module('qlik'));

	var scope, controller, $location, deferred, userService, authentication;

	beforeEach(inject(function($rootScope, $controller, _$location_, $q, _userService_, _authentication_) {
		scope = $rootScope.$new();
		$location = _$location_;
		deferred = $q.defer();
		userService = _userService_;
		authentication = _authentication_;
		
		spyOn(userService, 'createUser').and.returnValue(deferred.promise);
		spyOn(authentication, 'createSession').and.callThrough;
		spyOn($location, 'path').and.callThrough();

		controller = $controller('register', {
			$scope: scope
		});
	}));

	describe('submit', function() {

		beforeEach(function() {
			scope.account = { role: 'GUEST' };			
		});

		it('Should not submit on invalid form', function() {
			scope.registerForm = { $invalid: true };
			scope.submit();
			expect(userService.createUser).not.toHaveBeenCalled();
		});

		it('Should resolve promise', function() {
			scope.registerForm = { $invalid: false };
			scope.submit();
			deferred.resolve('User created');
			scope.$apply();

			// userService
			expect(userService.createUser).toHaveBeenCalled();
			expect(userService.createUser.calls.count()).toBe(1);

			// authentication
			expect(authentication.createSession).toHaveBeenCalled();
			expect(authentication.createSession.calls.count()).toBe(1);

			// $location
			expect($location.path).toHaveBeenCalled();
			expect($location.path.calls.count()).toBe(1);
			expect($location.path()).toBe('/home');
		});

		it('Should reject promise', function() {
			scope.registerForm = { $invalid: false };
			scope.submit();
			deferred.reject('Username already exists');
			scope.$apply();

			// userService
			expect(userService.createUser).toHaveBeenCalled();
			expect(userService.createUser.calls.count()).toBe(1);

			// authentication and $location
			expect(authentication.createSession).not.toHaveBeenCalled();
			expect($location.path).not.toHaveBeenCalled();

			// error
			expect(scope.error).toBeTruthy();
		});
	});
});