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
    spyOn(messageService, 'isPalindrome').and.returnValue(deferred.promise);

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

      // messageService
      expect(messageService.createMessage).toHaveBeenCalled();
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

  describe('selected message', function() {

    it('Should return the inverse value of message.selected', function() {
      var message = { selected: false };
      
      scope.selectedMessage(message);
      expect(message.selected).toBeTruthy();
    });
  });

  describe('delete message', function() {

    it('Should call the message service', function() {
      scope.deleteMessage();

      // messageService
      expect(messageService.deleteMessageByID).toHaveBeenCalled();
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

  describe('is palindrome', function() {

    var message;

    beforeEach(function() {
      message = {};
    });

    it('Should set message selected false', function() {
      scope.isPalindrome(message);
      expect(message.selected).toBeFalsy();
    });

    it('Should call the message service', function() {
      scope.isPalindrome(message);

      // messageService
      expect(messageService.isPalindrome).toHaveBeenCalled();
      expect(messageService.isPalindrome.calls.count()).toBe(1);
    });

    it('Should resolve the promise', function() {
      scope.isPalindrome(message);

      // Resolve mock promise
      deferred.resolve({ data: 'Qlik' });
      scope.$apply();

      expect(message.palindrome).toBe('Qlik');
    });

    it('Should reject the promise', function() {
      scope.isPalindrome(message);

      // Resolve mock promise
      deferred.reject(message);
      scope.$apply();
    });
  });
});