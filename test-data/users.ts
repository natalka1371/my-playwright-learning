export const PASSWORD = "secret_sauce";

export const users = {
    // Accepted credentials 
    standard: {username: "standard_user", password: PASSWORD},
    lockedOut: {username: "locked_out_user", password: PASSWORD},
    problem: {username: "problem_user", password: PASSWORD},
    performanceGlitch: {username: "performance_glitch_user", password: PASSWORD},
    error: {username: "error_user", password: PASSWORD},
    visual: {username: "visual_user", password: PASSWORD},

    // Invalid credentials (negative login scenarios)
    wrongPassword: {username: "standard_user", password: "wrong_password"},
    unknownUser: {username: "unknown_user", password: PASSWORD},
};

export const checkoutInfo = {
    valid: {firstName: "John", lastName: "Doe", zipCode: "12345"},
    missingFirstName: {firstName: "", lastName: "Doe", zipCode: "12345"},
    missingLastName: {firstName: "John", lastName: "", zipCode: "12345"},
    missingZipCode: {firstName: "John", lastName: "Doe", zipCode: ""},  
    missingAllFields: {firstName: "", lastName: "", zipCode: ""},
}