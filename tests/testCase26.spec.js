import { test } from '@playwright/test';
const {
    launchBrowser,
    verifyVisibility,
    scrollToFooter,
    scrollToHeader
} = require('./helpers');

test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Verify that home page is visible successfully
    await verifyVisibility(page, 'img[src="/static/images/home/logo.png"]');

    // 4. Scroll down page to bottom
    await scrollToFooter(page);

    // 5. Verify 'SUBSCRIPTION' is visible
    await verifyVisibility(page, 'h2:has-text("Subscription")');

    // 6. Scroll up page to top
    await scrollToHeader(page);

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await verifyVisibility(page, '#slider-carousel .carousel-inner .item.active h2:has-text("Full-Fledged practice website for Automation Engineers")');
});
