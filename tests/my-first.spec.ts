import {test, expect}   from '@playwright/test';

test('page has the correct title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});

type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

const shoes: Product = {
  name: "Running Shoes",
  price: 80.00,
  inStock: true
};

const shorts: Product = {
  name: "Basketball Shorts",
  price: 35.00,
  inStock: false
};