'use strict';

var homePage = function() {
    
  this.subject = element(by.model('message.subject'));
  this.content = element(by.model('message.content'));
  this.submit = element.all(by.css('.btn-primary'));
  this.messages = element.all(by.repeater('message in messages'));

  this.createSession = function() {

    // Custom cookie
    var cookie = {
      username: 'e2e',
      role: 'GUEST'
    };

    // Add cookie at localhost before navigating home
    browser.driver.get('http://localhost');
    browser.manage().addCookie({ name: 'user', value: JSON.stringify(cookie) });
  };

  this.clickMessage = function(id) {
    return element(by.repeater('message in messages').row(id)).click();
  };

  // Getters
  this.get = function() {
    browser.get('http://localhost:3000/home');
  };

  this.getMessage = function(id) {
    return element(by.repeater('message in messages').row(id));
  };

  this.getContent = function(id) {
    return element(by.repeater('message in messages').row(id).column('::message.Content'));
  };

  this.getPalindrome = function(id) {
    return element.all(by.css('.palindrome')).get(id);
  };

  this.getButtons = function(id) {
    return element.all(by.css('.message-actions')).get(id);
  };

  this.getDeleteButton = function(id) {
    return element.all(by.css('.btn-danger')).get(id);
  };

  // Setters
  this.setSubject = function(subject) {
    return this.subject.sendKeys(subject);
  };

  this.setContent = function(content) {
    return this.content.sendKeys(content);
  };
};

module.exports = homePage;