var loginPage = function() {
  
  this.registerLink = element.all(by.tagName('a')).get(0);
  this.username = element(by.model('credentials.username'));
  this.submit = element(by.tagName('button'));
  this.usernameRequired = element.all(by.css('.form-error')).get(0);
  this.usernameError = element.all(by.css('.form-error')).get(1);

  this.get = function() {
      browser.get('http://localhost:7000/login');
  }

  this.setUsername = function(username) {
      return this.username.sendKeys(username);
  }
}

module.exports = loginPage;