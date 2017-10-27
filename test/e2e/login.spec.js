'use strict';

var loginPage = require('./login.page.js');
var db = require('../../server/database.js');

describe('Qlik Audition Login', function() {

  // load login page
  var login = new loginPage();

  // Delete all cookies
    beforeAll(function() {
      browser.manage().deleteAllCookies();

      // Check for existing user
      db.query("SELECT * FROM Users WHERE Username='Alexander'", function(err, rows, fields) {
        if (err) throw err;

        if (!rows.length) {

          // Creating existing user
          db.query("INSERT INTO Users (Username) VALUES ('Alexander')", function(err, rows, fields) {
              if (err) throw err;
          });
        }
      });
    })

  // Get login url
  beforeEach(function() {
    login.get();
  });

  it('Should navigate to the register page', function() {
    login.registerLink.click();
    expect(browser.getCurrentUrl()).toMatch('/');
  });

  it('Should not submit empty credentials', function() {
    login.submit.click().then(function() {
      expect(login.usernameRequired.isDisplayed()).toBeTruthy();
    });
  });

  it('Should not submit invalid credentials', function() {
    login.setUsername('Undefined');
    login.submit.click().then(function() {
      expect(login.usernameError.isDisplayed()).toBeTruthy();
    });
  });

  it('Should navigate to the home page', function() {
    login.setUsername('Alexander');
    login.submit.click().then(function() {
          expect(browser.getCurrentUrl()).toMatch('/home');
      });

  });

  it('Should get the user cookie', function() {
    browser.manage().getCookie('user').then(function(cookie) {
      expect(cookie.name).toMatch('user');
    });
  });
});