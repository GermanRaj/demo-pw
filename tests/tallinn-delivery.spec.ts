import { expect, Locator, test } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/ar";
import 'dotenv/config'



const APP_URL = process.env.APP_URL;
const randomUsername = faker.internet.username();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
    await page.goto(`${APP_URL}/signin`);
});

test('Sign in button disabled when filling incorrect data', async ({ page }) => {
    const loginButton: Locator = page.getByRole('button', { name: 'Sign in' });
    const usernameInput: Locator = page.locator('#username');
    const passwordInput: Locator = page.locator('#password');
    await usernameInput.fill('guest');
    await passwordInput.fill('123');
    await expect(loginButton).toBeDisabled();
});

test('Using Random username and Password', async ({ page }) => {
    const usernameInput: Locator = page.locator('#username');
    const passwordInput: Locator = page.locator('#password');
    await usernameInput.fill(randomUsername);
    await passwordInput.fill(randomPassword);
    expect(usernameInput).not.toBe(undefined);
    expect(passwordInput).not.toBe(undefined);
});