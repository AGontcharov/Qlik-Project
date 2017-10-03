var registerPage = function() {

	this.registerLink = element.all(by.tagName('a')).get(0);
	this.username = element(by.model('account.username'));
	this.submit = element(by.tagName('button'));
	this.usernameRequired = element.all(by.css('.form-error')).get(0);
	this.usernameError = element.all(by.css('.form-error')).get(1);

	this.get = function() {
		browser.get('http://localhost:7000/');
	}

	this.setUsername = function(username) {
		return this.username.sendKeys(username);
	}
}

module.exports = registerPage;