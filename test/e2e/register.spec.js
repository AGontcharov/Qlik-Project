'use strict';

var registerPage = require('./register.page.js');
var db = require('../../server/database.js');

describe('Qlik Audition register', function() {

  // Load register page
  var register = new registerPage();

  // Delete all cookies and e2e user in database
  beforeAll(function(){
    browser.manage().deleteAllCookies();

    var id;
    db.query("Select ID FROM Users Where Username='e2e'", function(err, rows, field) {
      if (err) throw err;

      // Delete e2e user
      if (rows.length) {
        id = rows[0].ID

        db.query("DELETE FROM Messages WHERE Messages.ID='?'", id, function(err, rows, field) {
          if (err) throw err;
        });

        db.query("DELETE FROM Users WHERE ID='?'", id, function(err, rows, field) {
          if (err) throw err;
        });
      }
    });
  })

  // Get register url
  beforeEach(function() {
    register.get();
  });

  it('Should get the browser title', function() {     
    expect(browser.getTitle()).toEqual('Qlik Audition');
  });

  it('Should navigate to the login page', function() {
    register.registerLink.click();
    expect(browser.getCurrentUrl()).toMatch('/login');
  });

  it('Should not submit empty credentials', function() {
    register.submit.click().then(function() {
      expect(register.usernameRequired.isDisplayed()).toBeTruthy();
    });
  });

  it('Should not submit existing username', function() {
    register.setUsername('Alexander');
    register.submit.click().then(function() {
      expect(register.usernameError.isDisplayed()).toBeTruthy();
    });
  });

  it('Should navigate to the home page', function() {
    register.setUsername('e2e');
    register.submit.click().then(function(response) {
      expect(browser.getCurrentUrl()).toMatch('/home');
    });
  });

  it('Should get the user cookie', function() {
    browser.manage().getCookie('user').then(function(cookie) {
      expect(cookie.name).toMatch('user');
    });
  });
});