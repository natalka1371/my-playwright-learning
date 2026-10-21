import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../test-data/users";
import { LoginPage } from "../pages/LoginPage";

test.describe("Adding and removing products from cart", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page, "User should be redirected to inventory page").toHaveURL(
      /inventory/,
    );
  });

  test("User can add one product to cart", async () => {
    const productName = await inventoryPage.productNames.first().innerText();

    await inventoryPage.addProductToCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should show 1 item",
    ).toHaveText("1");

    await inventoryPage.openShoppingCart();

    await expect(
      cartPage.productNames,
      "Cart page should show the added product",
    ).toHaveCount(1);

    await expect(
      cartPage.productNames.first(),
      "Cart page should show the correct product name",
    ).toHaveText(productName);
  });

  test("User can remove a product from cart", async () => {
    await inventoryPage.addProductToCart();
    await inventoryPage.openShoppingCart();

    await expect(
      cartPage.productNames,
      "Cart page should show the added product",
    ).toHaveCount(1);

    await cartPage.removeProductFromCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should not be visible after removing the product",
    ).not.toBeVisible();

    await expect(
      cartPage.productNames,
      "Cart page should not show any products after removal",
    ).toHaveCount(0);
  });

  test("User can remove an added product from inventory page", async () => {
    await inventoryPage.addProductToCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should show 1 item",
    ).toHaveText("1");

    await inventoryPage.removeProductFromCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should not be visible after removing the product",
    ).not.toBeVisible();
  });

  test("User can add multiple products to cart", async () => {
    const firstProductName = await inventoryPage.productNames
      .first()
      .innerText();
    const secondProductName = await inventoryPage.productNames
      .nth(1)
      .innerText();

    await inventoryPage.addProductToCart();
    await inventoryPage.addProductToCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should show 2 items",
    ).toHaveText("2");

    await inventoryPage.openShoppingCart();

    await expect(
      cartPage.productNames,
      "Cart page should show the added products",
    ).toHaveCount(2);

    await expect(
      cartPage.productNames,
      "Cart page should show both added products with correct names",
    ).toHaveText([firstProductName, secondProductName]);
  });

  test("User can remove one of the multiple products from cart", async () => {
    await inventoryPage.addProductToCart();
    await inventoryPage.addProductToCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should show 2 items",
    ).toHaveText("2");

    await inventoryPage.openShoppingCart();

    await expect(
      cartPage.productNames,
      "Cart page should show the added products",
    ).toHaveCount(2);

    await cartPage.removeProductFromCart();

    await expect(
      inventoryPage.shoppingCartBadge,
      "Shopping cart badge should show 1 item after removing one product",
    ).toHaveText("1");

    await expect(
      cartPage.productNames,
      "Cart page should show only one product after removal",
    ).toHaveCount(1);
  });

  test.describe("Navigation from cart page", () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);

      await loginPage.open();
      await loginPage.login(users.standard.username, users.standard.password);
      await expect(
        page,
        "User should be redirected to inventory page",
      ).toHaveURL(/inventory/);
    });

    test("User can go back to inventory page from cart page", async ({
      page,
    }) => {
      await inventoryPage.addProductToCart();
      await inventoryPage.openShoppingCart();

      await expect(
        cartPage.productNames,
        "Cart page should show the added product",
      ).toHaveCount(1);

      await cartPage.navigateBackToInventory();

      await expect(
        page,
        "User should be redirected back to inventory page",
      ).toHaveURL(/inventory/);
    });

    test("User can proceed to checkout from cart page", async ({ page }) => {
      await inventoryPage.addProductToCart();
      await inventoryPage.openShoppingCart();

      await expect(
        cartPage.productNames,
        "Cart page should show the added product",
      ).toHaveCount(1);

      await cartPage.proceedToCheckout();

      await expect(
        page,
        "User should be redirected to checkout page",
      ).toHaveURL(/checkout-step-one/);
    });
  });
});
