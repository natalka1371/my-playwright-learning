// Import only 'test' from Playwright, no 'expect' needed
// since this test has no assertions
import {test} from '@playwright/test';

//Import 'validUser' object and "getLoginUrl' function from test-data.ts
//'..' means go up one directory level, then look for 'test-data.ts' file
import { validUser, getLoginUrl } from "../test-data";

//Define a test case, no '{page}' in the arrow function because this test doesn't open a browser
test("test data is wired correctly", async () => {

    //Destructuring - instead of writing valildUser.email and validUser.password separately
    //this pulls both values out of the object into their own variables
    const { email, password } = validUser; 

    //Call getLoginUrl with "staging" and print the result to the console"
    console.log("URL:", getLoginUrl("staging"));

    //Print the email value from the validUser object to the console
    console.log("Email:", email);

    //Print the password value from the validUser object to the console
    console.log("Password:", password);
});
