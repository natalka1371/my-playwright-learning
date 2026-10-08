import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButtons = page.getByRole("button", { name: "Remove" });
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.productNames = page.getByTestId("inventory-item-name");
  }

  async removeProductFromCart() {
    await this.removeButtons.first().click();
  }

  async navigateBackToInventory() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}