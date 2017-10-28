'use strict';

describe('Session Service', function() {

  beforeEach(module('app.auth'));

  var session;

  beforeEach(inject(function(_session_) {
    session = _session_;

    // Spies
    spyOn(session, 'create').and.callThrough();
    spyOn(session, 'destroy').and.callThrough();
  }));

  it('Should invoke the create method', function() {
    session.create('Qlik', 'HOST');

    // create
    expect(session.create).toHaveBeenCalled();
    expect(session.create.calls.count()).toBe(1);
  });

  it('Should create a session', function() {
    session.create('Qlik', 'HOST');

    // Assert session is defined
    expect(session.user).toBe('Qlik');
    expect(session.role).toBe('HOST');
  });

  it('Should invoke the destroy method', function() {
    session.destroy();

    // destroy
    expect(session.destroy).toHaveBeenCalled();
    expect(session.destroy.calls.count()).toBe(1);
  });

  it('Should destroy session', function() {
    session.user = 'Qlik';
    session.role = 'HOST';
    session.destroy();
    
    // Assert session is destroyed
    expect(session.user).toBeFalsy();
    expect(session.role).toBeFalsy();
  });
});