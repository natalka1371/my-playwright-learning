import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users, checkoutInfo } from "../test-data/users";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { errors } from "../test-data/errors";

test.describe("Checkout Page Tests", () => {
    let checkoutPage: CheckoutPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let productName: string;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await test.step("Login as a standard user", async () => {
            await loginPage.open();
            await loginPage.login(users.standard.username, users.standard.password);
            await expect(page, "User should be redirected to inventory page").toHaveURL(/inventory/);
        });

        await test.step("Add a product to the cart and proceed to checkout", async () => {
            productName = await inventoryPage.productNames.first().innerText();
            await inventoryPage.addProductToCart();
            await inventoryPage.openShoppingCart();
            await cartPage.proceedToCheckout();
            await expect(page, "User should be redirected to checkout page").toHaveURL(/checkout-step-one/);
        });
    });

    test("User can complete checkout with one product", async ({ page}) => {
        await test.step("Fill in checkout information", async () => {
            await checkoutPage.fillYourInformation(checkoutInfo.valid.firstName, checkoutInfo.valid.lastName, checkoutInfo.valid.zipCode);
            await expect(page, "User should be redirected to checkout overview page").toHaveURL(/checkout-step-two/);
        });

        await test.step("Verify product name", async () => {
            const checkoutProductName = await checkoutPage.productNames.first().innerText();
            await expect(checkoutProductName, "Product name should match the one added to the cart").toBe(productName);
        });

        await test.step("Finish checkout", async () => {
            await checkoutPage.finishCheckout();
            await expect(page, "User should be redirected to checkout complete page with success message").toHaveURL(/checkout-complete/);
            await expect(checkoutPage.successMessage, "Success message should be visible").toBeVisible();
        });
    });

    test("User can navigate back to home after completing checkout", async ({ page }) => {
        await checkoutPage.fillYourInformation(checkoutInfo.valid.firstName, checkoutInfo.valid.lastName, checkoutInfo.valid.zipCode);
        await checkoutPage.finishCheckout();
        await expect(page, "User should be redirected to checkout complete page").toHaveURL(/checkout-complete/);
        await checkoutPage.navigateBackToHome();
        await expect(page, "User should be redirected back to inventory page").toHaveURL(/inventory/);
        await expect(inventoryPage.shoppingCartBadge, "Shopping cart badge should not be visible after completing checkout").not.toBeVisible();
    });

    test.describe("Negative Scenarios", () => {
        test("User cannot proceed with missing first name", async () => {
            await checkoutPage.fillYourInformation(checkoutInfo.missingFirstName.firstName, checkoutInfo.missingFirstName.lastName, checkoutInfo.missingFirstName.zipCode);
            await expect(checkoutPage.errorMessage, "Error message should be visible for missing first name").toBeVisible();
            await expect(checkoutPage.errorMessage, "Error message should match the expected error").toHaveText(errors.missingFirstName);
        });

        test("User cannot proceed with missing last name", async () => {
            await checkoutPage.fillYourInformation(checkoutInfo.missingLastName.firstName, checkoutInfo.missingLastName.lastName, checkoutInfo.missingLastName.zipCode);
            await expect(checkoutPage.errorMessage, "Error message should be visible for missing last name").toBeVisible();
            await expect(checkoutPage.errorMessage, "Error message should match the expected error").toHaveText(errors.missingLastName);
        });

        test("User cannot proceed with missing zip code", async () => {
            await checkoutPage.fillYourInformation(checkoutInfo.missingZipCode.firstName, checkoutInfo.missingZipCode.lastName, checkoutInfo.missingZipCode.zipCode);
            await expect(checkoutPage.errorMessage, "Error message should be visible for missing zip code").toBeVisible();
            await expect(checkoutPage.errorMessage, "Error message should match the expected error").toHaveText(errors.missingZipCode);
        });

        test("User cannot proceed with empty form", async () => {
            await checkoutPage.fillYourInformation(checkoutInfo.missingAllFields.firstName, checkoutInfo.missingAllFields.lastName, checkoutInfo.missingAllFields.zipCode);
            await expect(checkoutPage.errorMessage, "Error message should be visible for missing all fields").toBeVisible();
            await expect(checkoutPage.errorMessage, "Error message should match the expected error for missing first name").toHaveText(errors.missingFirstName);
        });
    }); 
    
    test.describe("Cancel Checkout", () => {
        test("User can cancel checkout at first step and return to cart page", async ({ page }) => {
            await checkoutPage.cancelCheckout();
            await expect(page, "User should be redirected back to cart page").toHaveURL(/cart/);
            await expect(inventoryPage.shoppingCartBadge, "Shopping cart badge should show 1 item").toHaveText("1");
            await expect(cartPage.cartItems, "Cart should contain 1 item").toHaveCount(1);
        });

        test("User can cancel checkout at second step and return to cart page", async ({ page }) => {
            await checkoutPage.fillYourInformation(checkoutInfo.valid.firstName, checkoutInfo.valid.lastName, checkoutInfo.valid.zipCode);
            await expect(page, "User should be redirected to checkout overview page").toHaveURL(/checkout-step-two/);
            await checkoutPage.cancelCheckout();
            await expect(page, "User should be redirected back to inventory page").toHaveURL(/inventory/);
            await expect(inventoryPage.shoppingCartBadge, "Shopping cart badge should show 1 item").toHaveText("1");
        });
    });
}); 