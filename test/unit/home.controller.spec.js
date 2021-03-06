'use strict';

describe('Home Controller', function() {

  beforeEach(module('qlik'));

  var scope, controller, deferred, session, messageService;

  beforeEach(inject(function($rootScope, $controller, _$location_, $q, _session_, _messageService_) {
    scope = $rootScope.$new();
    deferred = $q.defer();
    session = _session_;
    messageService = _messageService_;
    
    // Spies
    spyOn(messageService, 'createMessage').and.returnValue(deferred.promise);
    spyOn(messageService, 'deleteMessageByID').and.returnValue(deferred.promise);

    controller = $controller('home', {
      $scope: scope
    });
  }));

  describe('submit', function() {

    it('Should get username from session', function() {
      session.user = 'Qlik';
      scope.message = {};
      scope.submit();
      expect(scope.message.username).toBe('Qlik');
    });

    it('Should call the message service', function() {
      scope.message = {};
      scope.submit();
      expect(messageService.createMessage.calls.count()).toBe(1);
    });

    it('Should resolve the promise', function() {
      scope.message = {};
      scope.submit();

      // Resolve mock promise
      deferred.resolve();
      scope.$apply();

      // message
      expect(scope.message.subject).toBe('');
      expect(scope.message.content).toBe('');
    });

    it('Should reject the promise', function() {
      scope.message = {};
      scope.submit();

      // Resolve mock promise
      deferred.reject();
      scope.$apply();
    });
  });

  describe('delete message', function() {

    it('Should call the message service', function() {
      scope.deleteMessage();
      expect(messageService.deleteMessageByID.calls.count()).toBe(1);
    });

    it('Should resolve the promise', function() {
      scope.deleteMessage();

      // Resolve mock promise
      deferred.resolve();
      scope.$apply();
    });

    it('Should reject the promise', function() {
      scope.deleteMessage();

      // Resolve mock promise
      deferred.reject();
      scope.$apply();
    });
  });
});