describe('Register Controller', function() {

    beforeEach(module('qlik'));

    var scope, controller, deferred, userService, authentication;

    beforeEach(inject(function($rootScope, $controller, $q, _userService_, _authentication_) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        userService = _userService_;
        authentication = _authentication_;
        
        // Spies
        spyOn(userService, 'createUser').and.returnValue(deferred.promise);
        spyOn(authentication, 'createSession');

        controller = $controller('register', {
            $scope: scope
        });
    }));

    describe('submit', function() {

        it('Should not submit on invalid form', function() {
            scope.registerForm = { $invalid: true };
            scope.submit();
            expect(userService.createUser).not.toHaveBeenCalled();
        });

        // Set register form invalid
        beforeEach(function() {
            scope.registerForm = { $invalid: false };           
        });

        it ('Should call the user service', function() {
            scope.submit();

            // Resolve mock promise
            deferred.resolve('User created');
            scope.$apply();

            // authentication
            expect(authentication.createSession).toHaveBeenCalled();
            expect(authentication.createSession.calls.count()).toBe(1);
        });

        it('Should resolve promise', function() {
            scope.submit();

            // Resolve mock promise
            deferred.resolve('User created');
            scope.$apply();

            // userService
            expect(userService.createUser).toHaveBeenCalled();
            expect(userService.createUser.calls.count()).toBe(1);
        });

        it('Should reject promise', function() {
            scope.submit();
            deferred.reject('User does not exist');
            scope.$apply();

            // error
            expect(scope.error).toBeTruthy();
        });
    });
});