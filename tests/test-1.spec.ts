import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
});

expect (page).toHaveURL(/inventory/);
expect (page.getByText('Products')).toBeVisible();
expect (page.getByTestId('shopping-cart-badge')).toHaveText('1');
expect (page.getByTestId('error')).toContainText('Username is required');
expect (page.getByRole('button', { name: 'Login' })).toBeEnabled();
expect (page.locator('.inventory_item_name').toHaveCount(6));