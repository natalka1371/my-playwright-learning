import { test, expect } from "@playwright/test";

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Root cause: The placeholder text for the username field is "Username", not "User Name"
//Fix: Change the placeholder text in the test to match the actual placeholder text in the application.
// How I verified: ran npx playwright test tests/broken-tests.spec.ts and confirmed that the test passed after making the change.

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByTestId("error")).toContainText(
    "Username and password do not match"   // ← is this the exact text?
  );
});

// toHaveText expects the exact text. The actual error message is "Username and password do not match any user in this service", so the test will fail if the expected text does not match exactly.
// Fix: Update toHaveText to toContainText to check for a substring instead of the exact text.
// How I verified : ran npx playwright test tests/broken-tests.spec.ts and confirmed that the test passed after making the change.

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// The add-to-cart click is missing await, which means the test may not wait for the click to complete before checking the cart badge. This can lead to flaky tests.
// Fix: Add await before the click action
// How I verified: Ran the test with --headed and --repeat-each=5 to check it passes consistently, and watched the cart badge show "1" after the click.