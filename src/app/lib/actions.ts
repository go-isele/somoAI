"use server";

// Import Axios for making HTTP requests
import axios from "axios";
// @ts-ignore
import Cookies from "js-cookie";

// Define a TypeScript interface for credentials
interface Credentials {
  email: string;
  password: string;
}

const loginApiUrl = "http://localhost:8000/api/token/"; // Accessing the environment variable

// Custom login function
async function customLogin(credentials: Credentials): Promise<void> {
  try {
    const response = await axios.post(loginApiUrl, credentials);
    const { access, refresh } = response.data;
    saveTokensToCookies(access, refresh);
    // Redirect the user to the dashboard or desired page
    window.location.href = "/";
  } catch (error) {
    throw new Error("Login failed"); // Throw an error if login fails
  }
}

// Define the cookie names for access and refresh tokens
const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

// Function to save tokens to cookies
function saveTokensToCookies(access: string, refresh: string): void {
  // Save access token to a cookie with an expiration of 1 day
  Cookies.set(ACCESS_TOKEN_COOKIE, access, { expires: 1 });

  // Save refresh token to a cookie with an expiration of 7 days
  Cookies.set(REFRESH_TOKEN_COOKIE, refresh, { expires: 7 });
}
// authenticate function using customLogin
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    // Call the customLogin function with the provided credentials
    await customLogin({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  } catch (error) {
    const errorMessage = (error as any).message;
    if (errorMessage) {
      switch (errorMessage) {
        case "Login failed":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
