// Import the 'test' function (to define tests) and 'expect' (to make assertions) 
// from installed package
import { test, expect } from '@playwright/test';

//First test, destructuring, call the test function with two arguments: a string name and an async arrow function
test('has title', async ({ page }) => {
  //call goto method on page object to navigate to the URL; await pauses execution until the navigation completed
  await page.goto('https://playwright.dev/');

  //Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

//second call to test function, new string name, new async arrow function
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

