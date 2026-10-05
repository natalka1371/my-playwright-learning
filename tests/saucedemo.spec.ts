import { test, expect } from '@playwright/test';

test.describe('SauceDemo Tests', () => {

test.describe('Login functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

test('Login with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect((page), "User should be redirected to inventory page").toHaveURL(/inventory/);

});

test('Login with wrong password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(
        page.getByTestId('error'),
        "Error should appear for wrong credentials"
    ).toBeVisible();

    await expect(page.getByTestId('error')).toContainText('Username and password do not match any user in this service');

});

test('Empty form validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
        page.getByTestId('error'),
        "Error should appear for empty form"
    ).toBeVisible();    
    
    await expect(page.getByTestId('error')).toContainText('Username is required');
});

test('Locked out user validation', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
        page.getByTestId('error'),
        "Error should appear for locked out user"
    ).toBeVisible();

    await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

});

test.describe('Adding/removing products functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/inventory/);
    });

test('Add product to cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByTestId('shopping-cart-badge'), "Shopping cart badge should show 1 item").toHaveText('1');
});

test('Remove product from cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.getByTestId('shopping-cart-badge'), "Shopping cart badge should not be visible").not.toBeVisible();
});   

test('Add multiple products to cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
    await expect(page.getByTestId('shopping-cart-badge'), "Shopping cart badge should show 3 items").toHaveText('3');

    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.getByTestId('shopping-cart-badge'), "Shopping cart badge should show 2 items").toHaveText('2');
});

test('State after refresh', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.reload();
    await expect(page.getByTestId('shopping-cart-badge'), "Shopping cart badge should show 1 item after refresh").toHaveText('1');
});

});

test('Sorting changes product order', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    const firstProductBeforeSort = await page.getByTestId('inventory-item-name').first().textContent();

    await page.getByTestId('product-sort-container').selectOption('lohi');

    const firstProductAfterSort = await page.getByTestId('inventory-item-name').first().textContent();

    await expect((firstProductBeforeSort), "First product before sort should not equal first product after sort").not.toEqual(firstProductAfterSort);
});

});