Test 1

Root cause:   The placeholder text in the locator was "User Name" (with a space),
              but the actual placeholder attribute in SauceDemo's HTML is "Username".
              Playwright could not find the element and timed out.

Fix:          Changed getByPlaceholder("User Name") to getByPlaceholder         ("Username").

How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium -g "login should redirect to inventory" --headed and confirmed
 the test passed and the browser landed on /inventory.html.


Test 2

Root cause:   The expected text in the assertion was "Username and password do not match",
              but toHaveText() requires an exact match. The actual error message
              SauceDemo displays is longer:
              "Epic sadface: Username and password do not match any user in this service".

Fix:          Replaced the expected string with the full exact text that SauceDemo renders.

How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium
              -g "error message on wrong password" and the error output showed
              Expected vs Received — copied the Received value, rerun test, test passed.

Test 3

Root cause:   The .click() call was missing await before it. JavaScript fired the
              click and immediately moved to the expect() assertion without waiting
              for the click to complete. The product was never added to the cart,
              so the badge never appeared and the assertion timed out.

Fix:          Added await before page.locator(...).click().

How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium
              -g "cart badge appears after adding product" --headed and confirmed
              the "Add to cart" button was clicked, the badge showed "1",
              and the test passed.