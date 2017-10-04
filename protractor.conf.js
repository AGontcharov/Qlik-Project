let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub', 
  
  specs: [
    'test/e2e/login.spec.js',
    'test/e2e/register.spec.js',
    'test/e2e/home.spec.js'
  ],

  suites: {
    login: 'test/e2e/login.spec.js',
    register: 'test/e2e/register.spec.js',
    home: 'test/e2e/home.spec.js'
  },

  capabilities: {
    browserName: 'chrome'
  },

  jasmineNodeOpts: { 
    showColors: true,
    isVerbose: true,
    print: function() {}
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
}