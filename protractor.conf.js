exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub', 
  specs: [
    // 'test/e2e/login.spec.js',
    'test/e2e/register.spec.js'
  ],

  capabilities: {
    browserName: 'chrome'
  }
}