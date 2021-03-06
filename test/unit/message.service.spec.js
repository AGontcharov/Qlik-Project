'use strict';

describe('Message Service', function() {

  beforeEach(module('qlik'));

  var $httpBackend, messageService;

  beforeEach(inject(function(_$httpBackend_, _messageService_) {
    $httpBackend = _$httpBackend_;
    messageService = _messageService_;

    // POST api/messages
    $httpBackend
      .when('POST', '/api/messages', { username: 'Jack', subject: 'Unit Testing', content: 'With $httpBackend' })
      .respond(201, { foo: 'Created' });

    $httpBackend
      .when('POST', '/api/messages', { username: '', subject: 'Unit Testing', content: 'With $httpBackend' })
      .respond(201, { foo: 'Created' });

    $httpBackend
      .when('POST', '/api/messages', { username: 'Jack', subject: '', content: 'With $httpBackend' })
      .respond(400, { foo: 'Created' });

    $httpBackend
      .when('POST', '/api/messages', { username: 'Jack', subject: 'Unit Testing', content: '' })
      .respond(400, { foo: 'Created' });

    // GET api/messages
    $httpBackend
      .when('GET', '/api/messages')
      .respond(200, { foo: 'Retrieved' });

    // GET api/messages/:messageID
    $httpBackend
      .when('GET', '/api/messages/1')
      .respond(200, { foo: 'Message 1' });

    $httpBackend
      .when('GET', '/api/messages/199')
      .respond(404, { foo: 'Not Found' });

    // DELETE api/messages/:messageID
    $httpBackend
      .when('DELETE', '/api/messages/1')
      .respond(204, { foo: 'Deleted' });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Should POST api/messages', function() {

    it('Should create a message (HTTP 201)', function() {

      // Fetch promise
      messageService.createMessage({ username: 'Jack', subject: 'Unit Testing', content: 'With $httpBackend' }).then(function(response) {

        // Assert
        expect(response.status).toBe(201);
        expect(response.data.foo).toBe('Created');
      })
      .catch(function(error) {});
      $httpBackend.flush();
    });

    it('Should return missing username (HTTP 400)', function() {

      // Fetch promise
      messageService.createMessage({ username: '', subject: 'Unit Testing', content: 'With $httpBackend' }).then(function(response) {})
      .catch(function(error) {

        // Assert
        expect(error.status).toBe(400);
        expect(error.message).toBe('Error posting message');
      });
      $httpBackend.flush();
    });

    it('Should return missing subject (HTTP 400)', function() {

      // Fetch promise
      messageService.createMessage({ username: 'Jack', subject: '', content: 'With $httpBackend' }).then(function(response) {})
      .catch(function(error) {

        // Assert
        expect(error.status).toBe(400);
        expect(error.message).toBe('Error posting message');
      });
      $httpBackend.flush();
    });

    it('Should return missing content (HTTP 400)', function() {

      // Fetch promise
      messageService.createMessage({ username: 'Jack', subject: 'Unit Testing', content: '' }).then(function(response) {})
      .catch(function(error) {

        // Assert
        expect(error.status).toBe(400);
        expect(error.message).toBe('Error posting message');
      });
      $httpBackend.flush();
    });
  });

  describe('Should GET api/messages', function() {

    it('Should retrieve list of messages (HTTP 200)', function() {

      // Fetch promise
      messageService.getMessages().then(function(response) {

        // Assert
        expect(response.status).toBe(200);
        expect(response.data.foo).toBe('Retrieved');
      })
      .catch(function(error) {});
      $httpBackend.flush();
    });
  });

  describe('Should GET api/messages/:messageID', function() {

    it('Should retrieve message #1 (HTTP 200)', function() {

      // Fetch promise
      messageService.getMessageByID(1).then(function(response) {

        // Assert
        expect(response.status).toBe(200);
        expect(response.data.foo).toBe('Message 1');
      })
      .catch(function(error) {});
      $httpBackend.flush();
    });

    it('Should fail to retrieve undefined message #199 (HTTP 404)', function() {

      // Fetch promise
      messageService.getMessageByID(199).then(function(response) {})
      .catch(function(error) {

        // Assert
        expect(error.status).toBe(404);
        expect(error.message).toBe('Error getting message by ID');
      });
      $httpBackend.flush();
    });
  });

  describe('Should DELETE api/messages/:messageID', function() {

    it('Should delete message #1 (HTTP 200)', function() {

      // Fetch promise
      messageService.deleteMessageByID(1).then(function(response) {

        // Assert
        expect(response.status).toBe(204);
        expect(response.data.foo).toBe('Deleted');
      })
      .catch(function(error) {});
      $httpBackend.flush();
    });
  });
});