const { expect, test} = require('@playwright/test');

async function launchBrowser(page) {
    await page.goto('http://automationexercise.com');
}

async function verifyVisibility(page, selector) {
    await expect(page.locator(selector)).toBeVisible();
}

async function clickButton(page, selector) {
    await page.click(selector);
}

async function fillForm(page, selector, value) {
    await page.fill(selector, value);
}

function getBaseUserData(email) {
    return {
        name: 'Test User',
        email: email,
        password: 'password123',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Test',
        lastname: 'User',
        company: 'TestCompany',
        address1: '123 Test Street',
        address2: 'Apt 1',
        country: 'United States',
        zipcode: '12345',
        state: 'TestState',
        city: 'TestCity',
        mobile_number: '1234567890'
    };
}

async function fillFormRegisterUser(page) {
    const userData = getBaseUserData(''); // No necesitamos email para UI
    await page.check('input[id="id_gender1"]'); // Seleccionar el título
    await fillForm(page, 'input[name="password"]', userData.password);
    await page.selectOption('select[name="days"]', userData.birth_date);
    await page.selectOption('select[name="months"]', userData.birth_month);
    await page.selectOption('select[name="years"]', userData.birth_year);
    await page.check('input#newsletter');
    await page.check('input#optin');
    await fillForm(page, 'input[name="first_name"]', userData.firstname);
    await fillForm(page, 'input[name="last_name"]', userData.lastname);
    await fillForm(page, 'input[name="company"]', userData.company);
    await fillForm(page, 'input[name="address1"]', userData.address1);
    await fillForm(page, 'input[name="address2"]', userData.address2);
    await page.selectOption('select[name="country"]', userData.country);
    await fillForm(page, 'input[name="state"]', userData.state);
    await fillForm(page, 'input[name="city"]', userData.city);
    await fillForm(page, 'input[name="zipcode"]', userData.zipcode);
    await fillForm(page, 'input[name="mobile_number"]', userData.mobile_number);
}

async function generateUniqueEmail() {
    const timestamp = new Date().getTime();
    return `testuser${timestamp}@example.com`;
}

async function compareTextContentElementByElement(page, selector, expectedValues) {
    const elements = await page.$$(selector);
    for (let i = 0; i < expectedValues.length; i++) {
        const text = (await elements[i].textContent()).trim().replace(/\s+/g, ' '); // Normaliza el texto recibido
        const expected = expectedValues[i].trim().replace(/\s+/g, ' '); // Normaliza el texto esperado

        expect(text).toBe(expected);
    }
}

async function checkAddresandOrder(page){
    const productDescriptions = ['Blue Top', 'Men Tshirt'];
    await compareTextContentElementByElement(page, '.cart_description h4 a', productDescriptions);
    const productQuantities = ['1', '1'];
    await compareTextContentElementByElement(page, '.cart_quantity button', productQuantities);
    const direccionEsperada = [
        'Your billing address',
        'Mr. Test User',
        'TestCompany',
        '123 Test Street',
        'Apt 1',
        'TestCity TestState 12345',
        'United States',
        '1234567890'
    ];
    await compareTextContentElementByElement(page, '#address_invoice li', direccionEsperada);
}

async function addProducts(page) {

    await clickButton(page, 'a[href="/products"]');
    await page.waitForSelector('a[data-product-id="1"]', { state: 'visible' });
    await page.hover('a[data-product-id="1"]');
    await clickButton(page, 'a[data-product-id="1"].add-to-cart');
    await clickButton(page, 'button.close-modal');
    await page.waitForSelector('a[data-product-id="2"]', { state: 'visible' });
    await page.hover('a[data-product-id="2"]');
    await clickButton(page, 'a[data-product-id="2"].add-to-cart');
    await clickButton(page, 'button.close-modal');
}

async function createAccount(page, email) {
    await launchBrowser(page);
    await clickButton(page, 'a[href="/login"]');
    await fillForm(page, 'input[data-qa="signup-name"]', 'Test User');
    await fillForm(page, 'input[data-qa="signup-email"]', email);
    await clickButton(page, 'button[data-qa="signup-button"]');
    await verifyVisibility(page, 'h2:has-text("Enter Account Information")');
    await page.check('input[id="id_gender1"]');
    await fillForm(page, 'input[name="password"]', 'password123');
    await page.selectOption('select[name="days"]', '1');
    await page.selectOption('select[name="months"]', '1');
    await page.selectOption('select[name="years"]', '2000');
    await page.check('input#newsletter');
    await page.check('input#optin');
    await fillForm(page, 'input[name="first_name"]', 'Test');
    await fillForm(page, 'input[name="last_name"]', 'User');
    await fillForm(page, 'input[name="company"]', 'TestCompany');
    await fillForm(page, 'input[name="address1"]', '123 Test Street');
    await fillForm(page, 'input[name="address2"]', 'Apt 1');
    await page.selectOption('select[name="country"]', 'United States');
    await fillForm(page, 'input[name="state"]', 'TestState');
    await fillForm(page, 'input[name="city"]', 'TestCity');
    await fillForm(page, 'input[name="zipcode"]', '12345');
    await fillForm(page, 'input[name="mobile_number"]', '1234567890');
    await clickButton(page, 'button:has-text("Create Account")');
    await verifyVisibility(page, 'h2:has-text("Account Created!")');
    await clickButton(page, 'a:has-text("Continue")');
    await clickButton(page, 'a:has-text("Logout")');
}

async function login(page, email) {
    await fillForm(page, 'input[data-qa="login-email"]', email);
    await fillForm(page, 'input[data-qa="login-password"]', 'password123');
    await clickButton(page, 'button[data-qa="login-button"]');
}

async function loginLogout(page, email, password) {
    await fillForm(page, 'input[data-qa="login-email"]', email);
    await fillForm(page, 'input[data-qa="login-password"]', password);
    await clickButton(page, 'button[data-qa="login-button"]');
}

async function insertCreditCard(page) {
    await fillForm(page, 'input[name="name_on_card"]', 'Test User');
    await fillForm(page, 'input[name="card_number"]', '123456789');
    await fillForm(page, 'input[name="cvc"]', '123');
    await fillForm(page, 'input[name="expiry_month"]', '12');
    await fillForm(page, 'input[name="expiry_year"]', '2029');
}

async function checkHomePage(page) {
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');
    await verifyVisibility(page, 'text=Category'); 
    await verifyVisibility(page, 'footer');
}

async function checkCartPage(page) {
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');
    await verifyVisibility(page, '.table-responsive.cart_info');
    await verifyVisibility(page, 'footer');
}

async function getUserDataForAPI(email) {
    return getBaseUserData(email);
}

module.exports = {  
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm,
    fillFormRegisterUser,
    generateUniqueEmail,
    checkAddresandOrder,
    addProducts,
    createAccount,
    login,
    loginLogout,
    insertCreditCard,
    checkHomePage,
    checkCartPage,
    getUserDataForAPI,
}