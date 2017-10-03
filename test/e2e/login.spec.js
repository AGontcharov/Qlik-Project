var loginPage = require('./login.page.js');

describe('Qlik Audition Login', function() {

	// load login page
	var login = new loginPage();

	// Delete all cookies
    browser.manage().deleteAllCookies();

    // Get login ulr
	beforeEach(function() {
		login.get();
	});

	it('Should get the browser title', function() {		
    	expect(browser.getTitle()).toEqual('Qlik Audition');
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
    	login.username.clear();
    });

    it('Should navigate to the home page', function() {
    	login.setUsername('Alexander').then(function() {
    		expect(login.usernameRequired.isDisplayed()).toBeFalsy();
    		expect(login.usernameError.isDisplayed()).toBeFalsy();
    	});
    	login.submit.click();
    	expect(browser.getCurrentUrl()).toMatch('/home');

    });

    it('Should get the user cookie', function() {
    	login.setUsername('Alexander');
    	login.submit.click();

    	browser.manage().getCookie('user').then(function(cookie) {
    		expect(cookie.name).toMatch('user');
    	});
	});
});