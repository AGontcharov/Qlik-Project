'use strict';

describe('Navbar Controller', function() {

  beforeEach(module('qlik'));

  var scope, controller, authentication;

  beforeEach(inject(function($rootScope, $controller, _authentication_) {
    scope = $rootScope.$new();
    authentication = _authentication_;

    controller = $controller('navbar', {
      $scope: scope
    });
  }));

  describe('logout', function() {

    it('Should call the authentication service', function() {
      spyOn(authentication, 'logout');
      scope.logout();

      // authentication
      expect(authentication.logout.calls.count()).toBe(1);
    });
  });
});