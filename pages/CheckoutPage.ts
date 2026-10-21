import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  // Step 1 - Your information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2 - Overview
  readonly finishButton: Locator;
  readonly productNames: Locator;

  // Step 3 - Complete
  readonly successMessage: Locator;
  readonly backHomeButton: Locator;
  

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.zipCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.errorMessage = page.getByTestId("error");

    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.productNames = page.getByTestId("inventory-item-name");

    this.successMessage = page.getByTestId("complete-header");
    this.backHomeButton = page.getByRole("button", { name: "Back Home" }); 

  }

  async fillYourInformation(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();  
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async navigateBackToHome() {
    await this.backHomeButton.click();
  } 
}