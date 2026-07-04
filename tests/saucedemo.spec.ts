import { test, expect } from "@playwright/test";

test.describe("Saucedemo", () => {

test.describe("Login", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Login - Happy path", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page, "Should redirect to inventory page after successful login").toHaveURL(/inventory/);
    });

    test("Negative login", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("invalid_user");
        await page.getByPlaceholder("Password").fill("invalid_password");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(
            page.getByTestId("error"),
            "Error should appear for wrong credentials"
        ).toBeVisible();
    });

    test("Empty form validation", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();

        await expect(
            page.getByTestId("error"),
            "Validation error should appear"
        ).toBeVisible();
    });

});

test.describe("Cart", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page, "Should redirect to inventory page after successful login").toHaveURL(/inventory/);
    });

    test("Add product to cart", async ({ page }) => {
        await page.getByRole("button", { name: "Add to cart"}).first().click();
        
        await expect(
             page.locator(".shopping_cart_badge"),
             "Cart badge should show 1 after adding a product"
            ).toHaveText("1");
    });

    test("Remove product from cart", async ({ page }) => {
          await page.getByRole("button", { name: "Add to cart" }).first().click();

          await expect(
            page.getByTestId("shopping-cart-badge"),
            "Cart badge should show 1 after adding a product"
            ).toHaveText("1");

        await page.getByRole("button", { name: "Remove" }).first().click();

        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should not be visible after removing product"
            ).not.toBeVisible();

    });

    test("Add 3 products to cart and remove one", async ({ page }) => {
        await page.getByRole("button", { name: "Add to cart"}).nth(0).click();
        await page.getByRole("button", { name: "Add to cart"}).nth(1).click();
        await page.getByRole("button", { name: "Add to cart"}).nth(2).click();

        await expect(
             page.locator(".shopping_cart_badge"),
             "Cart badge should show 3 after adding three products"
            ).toHaveText("3");

        await page.getByRole("button", { name: "Remove" }).nth(0).click();

        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should show 2 after removing one product"
            ).toHaveText("2");
    });

    test("State after refresh", async ({ page }) => {
        await page.getByRole("button", { name: "Add to cart"}).first().click();

        await expect(
             page.locator(".shopping_cart_badge"),
             "Cart badge should show 1 after adding a product"
            ).toHaveText("1");

        await page.reload();

        await expect(
             page.locator(".shopping_cart_badge"),
             "Cart badge should still show 1 after refresh"
            ).toHaveText("1");

    });

    test("Sort by price low to high", async ({ page }) => {
        await expect(
            page.getByTestId("inventory-item-name").first(),
            "Before sorting, first product should be Sauce Labs Backpack"
        ).toHaveText("Sauce Labs Backpack");

        await page.getByTestId("product-sort-container").selectOption("lohi");

        await expect(
            page.getByTestId("inventory-item-name").first(),
            "After sorting low to high, first product should be Sauce Labs Onesie"
        ).toHaveText("Sauce Labs Onesie");
    });

});

});
