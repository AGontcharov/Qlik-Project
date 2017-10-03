describe('Message Service', function() {

    beforeEach(module('qlik'));

    var $httpBackend, messageService;

    beforeEach(inject(function(_$httpBackend_, _messageService_) {
        $httpBackend = _$httpBackend_;
        messageService = _messageService_;

        // POST api/messages
        $httpBackend
            .when('POST', '/api/messages', { subject: 'Unit Testing', content: 'With $httpBackend' })
            .respond(201, { foo: 'Created' });


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

        
        // GET api/messages/:messageID/palindrome
        $httpBackend
            .when('GET', '/api/messages/5/palindrome')
            .respond(200, { foo: true });

        $httpBackend
            .when('GET', '/api/messages/7/palindrome')
            .respond(200, { foo: false });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Should POST api/messages', function() {

        it('Should create a message (HTTP 201)', function() {

            // Fetch promise
            messageService.createMessage({ subject: 'Unit Testing', content: 'With $httpBackend' }).then(function(response) {

                // Assert
                expect(response.status).toBe(201);
                expect(response.data.foo).toBe('Created');
            })
            .catch(function(error) {});
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

    describe('Should GET api/messages/:messageID/palindrome', function() {

        it('Should return true for message #5 (HTTP 200)', function() {

            // Fetch promise
            messageService.isPalindrome(5).then(function(response) {

                // Assert
                expect(response.status).toBe(200);
                expect(response.data.foo).toBeTruthy();
            })
            .catch(function(error) {});
            $httpBackend.flush();
        });

        it('Should return false for message #7 (HTTP 200)', function() {

            // Fetch promise
            messageService.isPalindrome(7).then(function(response) {

                // Assert
                expect(response.status).toBe(200);
                expect(response.data.foo).toBeFalsy();
            })
            .catch(function(error) {});
            $httpBackend.flush();
        });
    });
});