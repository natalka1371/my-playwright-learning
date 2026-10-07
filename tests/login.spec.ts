import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';
import { errors } from '../test-data/errors';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test('Standard user can log in and lands on the inventory page', async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page, 'User should be redirected to inventory page').toHaveURL(/inventory/);
    });

    test('Locked out user cannot log in and sees an error message', async ({ page }) => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);

        await expect(loginPage.errorMessage, 'Locked out user should see an error message').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.lockedOut);

    });

    test('User can not log in with wrong password', async ({ page }) => {
        await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);

        await expect(loginPage.errorMessage, 'User should see an error message for wrong credentials').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('User can not log in with unknown username', async ({ page }) => {
        await loginPage.login(users.unknownUser.username, users.unknownUser.password);

        await expect(loginPage.errorMessage, 'User should see an error message for unknown username').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.invalidCredentials);
    });

    test('Empty form validation shows error messages', async ({ page }) => {
        await loginPage.loginButton.click();

        await expect(loginPage.errorMessage, 'User should see an error message for empty form').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.missingUsername);
    });

    test('Missing username shows error message', async ({ page }) => {
        await loginPage.login("", users.standard.password);

        await expect(loginPage.errorMessage, 'User should see an error message for missing username').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.missingUsername);
    });

    test('Missing password shows error message', async ({ page }) => {
        await loginPage.login(users.standard.username, "");

        await expect(loginPage.errorMessage, 'User should see an error message for missing password').toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(errors.missingPassword);
    });

})