type Credentials = {
    email: string;
    password: string;
    role?: string; //? means field is optional
};

const validUser: Credentials = {
    email: "user@test.com",
    password: "password123",
    role: "admin",
};

function getLoginUrl (env: string): string {
    return `https://${env}.example.com/login`; //$ inserts a variable value into a string
}

//export it  so other files can import and use them
export { validUser, getLoginUrl };