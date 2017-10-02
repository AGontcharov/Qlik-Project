describe('User Service', function() {

    beforeEach(module('qlik'));

    var $httpBackend, userService;

    beforeEach(inject(function(_$httpBackend_, _userService_) {
        $httpBackend = _$httpBackend_;
        userService = _userService_;

        // POST api/users
        $httpBackend
            .when('POST', '/api/users', { username: 'Corey' })
            .respond(201, { foo: 'Created' });

        $httpBackend
            .when('POST', '/api/users', { username: 'Sergey' })
            .respond(409, { foo: 'Conflict' });


        // POST api/users/login
        $httpBackend
            .when('POST', '/api/users/login', { username: 'Alexander' })
            .respond(200, { foo: 'Authenticated' });

        $httpBackend
            .when('POST', '/api/users/login', { username: 'Tim' })
            .respond(404, { foo: 'Conflict' });


        // GET api/users
        $httpBackend
            .when('GET', '/api/users')
            .respond(200, { foo: 'Retrieved' });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Should POST api/users', function() {

        it('Should create user (HTTP 201)', function() {

            // Fetch promise
            userService.createUser({ username: 'Corey' }).then(function(response) {
                expect(response.status).toBe(201);
                expect(response.data.foo).toBe('Created');
            })
            .catch(function(error) {});
            $httpBackend.flush();
        });

        it('Should fail to create user (HTTP 409)', function() {

            // Fetch promise
            userService.createUser({ username: 'Sergey' }).then(function(response) {})
            .catch(function(error) {

                // Assert
                expect(error.status).toBe(409);
                expect(error.message).toBe('Error creating user');
            });
            $httpBackend.flush();
        });
    });

    describe('Should POST api/users/login', function() {

        it('Should authenticate the user (HTTP 200)', function() {

            // Fetch promise
            userService.authenticate({ username: 'Alexander' }).then(function(response) {

                // Assert
                expect(response.status).toBe(200);
                expect(response.data.foo).toBe('Authenticated');
            })
            .catch(function(error) {});
            $httpBackend.flush();
        });

        it('Should fail to authenticate the user (HTTP 404)', function() {

            // Fetch promise
            userService.authenticate({ username: 'Tim' }).then(function(response) {})
            .catch(function(error) {

                // Assert
                expect(error.status).toBe(404);
                expect(error.message).toBe('Error authenticating user');
            });
            $httpBackend.flush();
        });
    });

    describe('Should GET api/users', function() {

        it('Should retrieve list of users (HTTP 200)', function() {

            // Fetch promise
            userService.getUsers().then(function(response) {

                // Assert
                expect(response.status).toBe(200);
                expect(response.data.foo).toBe('Retrieved');
            })
            .catch(function(error) {});
            $httpBackend.flush();
        });
    });
});