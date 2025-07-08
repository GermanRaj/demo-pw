import {expect, Locator, test} from "@playwright/test";


test.beforeEach(async ({ page }) => {
    const path = require('path');
    const filePath = `file://${path.resolve('src/order.html')}`;
    await page.goto(filePath);
})

test('button disabled initially', async ({ page }) => {
     const orderBtn: Locator = page.getByTestId('submit-order');
     await expect(orderBtn).toBeDisabled();
});

test('button enabled after filling correct data', async ({ page }) => {
     const orderBtn: Locator = page.getByTestId('submit-order');
     const userName: Locator = page.getByTestId('username');
     const email: Locator = page.getByTestId('email');
     await userName.fill('germans')
     await email.fill('greajevskis@gmail.com')
     await expect(orderBtn).toBeEnabled();
});

test('popup is visible', async ({ page }) => {
    const orderBtn: Locator = page.getByTestId('submit-order');
    const userName: Locator = page.getByTestId('username');
    const email: Locator = page.getByTestId('email');
    const popupMessage: Locator = page.locator('#popup-message')
    await userName.fill('germans')
    await email.fill('greajevskis@gmail.com')
    await orderBtn.click();
    await expect(popupMessage).toBeVisible();
    await expect(popupMessage).toHaveText('OK')
});

test('button disabled if email is incorrect', async ({ page }) => {
    const orderBtn: Locator = page.getByTestId('submit-order');
    const userName: Locator = page.getByTestId('username');
    const email: Locator = page.getByTestId('email');
    await userName.fill('germans')
    await email.fill('adadads@asdasda')
    await expect(orderBtn).toBeDisabled();

});

