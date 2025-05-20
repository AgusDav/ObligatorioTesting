const navigateToHome = async (page) => {
    await page.goto('https://automationexercise.com');
  };
  
  module.exports = { navigateToHome };
  