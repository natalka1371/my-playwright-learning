# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → product sorting → product selection → cart → checkout → back home

## Test cases

### Login
- Valid user can log in
- Locked user cannot log in
- User cannot log in with wrong password
- User cannot log in with unknown username
- Empty login form shows an error
- Missing username shows an error
- Missing password shows an error

### Product sorting
- User can sort products by price

### Cart
- User can add one product to cart
- User can remove product from cart
- User can remove added product from inventory page
- User can add multiple products to cart
- User can remove one of the multiple products from cart
- User can navigate back to inventory from cart page
- User can proceed to checkout from cart page

### Checkout
- User can complete checkout and see success message
- User cannot proceed checkout with missing first name
- User cannot proceed checkout with missing last name
- User cannot proceed checkout with missing zip code
- User cannot proceed with empty checkout form
- User can cancel checkout at first step
- User can cancel checkout at second step

### Back home
- User can navigate back home after checkout


## Project structure
- `pages/` — Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
- `tests/` — test specs (*.spec.ts)
    - `login.spec.ts` - login tests
    - `sorting.spec.ts` - product sorting tests
    - `cart.spec.ts` - cart tests
    - `checkout.spec.ts` - checkout and back home tests
- `test-data/` — credentials and test inputs
    - `users.ts` - usernames and passwords for login and checkout
    - `errors.ts` - expected error messages for login and checkout forms
- `playwright.config.ts` — configuration
- `.github/workflows/playwright.yml` - CI workflow (GitHub Actions)

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## CI
Tests run automatically in GitHub Actions on every push and pull request to `main`/`master`.
The HTML report is uploaded as an artifact (`playwright-report`) and kept for 30 days.

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByTestId`, `getByPlaceholder`)
- Test data is stored separately from test logic

## Known limitations
- This suite covers only the selected user journey
- It does not cover all possible edge cases
- Sorting is tested only for "Price (low to high)"
- The following SauceDemo users are not covered: `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`