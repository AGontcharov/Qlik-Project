'use strict';

var homePage = require('./home.page.js');
var db = require('../../server/database.js');

describe('Qlik Audition home', function() {

  // load home page
  var home = new homePage();

  beforeAll(function() {

    // Delete all cookies
    browser.manage().deleteAllCookies();

    // Delete all messages
    db.query("DELETE FROM Messages", function(err, rows, fields) {
      if (err) throw err;
    });

    // Check for existing user
    db.query("SELECT * FROM Users WHERE Username='e2e'", function(err, rows, fields) {
      if (err) throw err;

      if (!rows.length) {

        // Creating existing user
        db.query("INSERT INTO Users (Username) VALUES ('e2e')", function(err, rows, fields) {
          if (err) throw err;
        });
      }
    });

    // Create user session
    home.createSession();
  });

  // Get home url
  beforeEach(function() {
    home.get();
  });

  it('Should be on the home page', function() {
    expect(browser.getCurrentUrl()).toMatch('/home');
  });

  it('Should get the user cookie', function() {
    browser.manage().getCookie('user').then(function(cookie) {
      expect(cookie.name).toMatch('user');
    });
  });

  it('Should not display any messages', function() {
    expect(home.messages.count()).toBe(0);
  });

  it('Should be able to post a message', function() {
    home.setSubject('From e2e');
    home.setContent('Should be able to post message');
    home.submit.click().then(function() {
      expect(home.messages.count()).toBe(1);
    });
  });

  it('Should display message contents', function() {
    home.clickMessage(0).then(function() {
      expect(home.getContent(0).isDisplayed()).toBeTruthy();
      expect(home.getButtons(0).isDisplayed()).toBeTruthy();
    });
  });

  it('Should hide message contents', function() {
    home.clickMessage(0);
    home.clickMessage(0).then(function() {
      expect(home.getContent(0).isDisplayed()).toBeFalsy();
      expect(home.getButtons(0).isDisplayed()).toBeFalsy();
    });
  });

  it('Should be able to post a message with a palindrome', function() {
    home.setSubject('From e2e');
    home.setContent('anna');
    home.submit.click().then(function() {
      expect(home.messages.count()).toBe(2);
    });
  });

  it('Should be able to check if message contains a palindrome', function() {
    expect(home.getPalindrome(1).isDisplayed()).toBeTruthy();
  });

  it('Should be able to delete a message', function() {
    home.clickMessage(1);
    home.getDeleteButton(1).click().then(function() {
      expect(home.messages.count()).toBe(1);
    });
  });
});