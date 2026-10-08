import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly productNames: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.getByRole("button", { name: "Add to cart" });
    this.removeButtons = page.getByRole("button", { name: "Remove" });
    this.productNames = page.getByTestId("inventory-item-name");
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.sortDropdown = page.getByTestId("product-sort-container");
  }

  async addProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeProductFromCart() {
    await this.removeButtons.first().click();
  }

  async openShoppingCart() {
    await this.shoppingCartLink.click();
  }
}
