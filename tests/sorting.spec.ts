import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../test-data/users";

test ("User can sort products by price from low to high", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page, "User should be redirected to inventory page").toHaveURL(/inventory/);

    await inventoryPage.sortProductsByPriceLowToHigh();
    const priceTexts = await inventoryPage.itemPrices.allTextContents();

    const prices: number[] = [];
    for (const text of priceTexts) {
        const price = Number(text.replace("$", ""));
        prices.push(price);
    }

    for (let i = 0; i < prices.length - 1; i++) {
        await expect(prices[i], `Price ${prices[i]} should not be greater than ${prices[i + 1]}`).toBeLessThanOrEqual(prices[i + 1]);
    }
});