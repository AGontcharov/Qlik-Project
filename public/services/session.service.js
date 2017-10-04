angular
  .module('app.auth')
  .service('session', session);

function session() {

  /**
   * Create user session
   * @param {String} user - The username
   * @param {String} role - The user's role
   */
  this.create = function(user, role) {
    this.user = user;
    this.role = role;
  };

  /*
   *  Destroys the user session
   */
  this.destroy = function() {
    this.user = null;
    this.role = null;
  }

  return this;
}