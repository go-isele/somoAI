import axios, { AxiosResponse } from "axios";
// @ts-ignore
import Cookies from "js-cookie";

// Define a TypeScript interface for credentials
interface Credentials {
  email: string;
  password: string;
}

// Define a TypeScript interface for registration data
interface RegistrationData extends Credentials {
  user_type: string;
}

// Define the cookie names for access and refresh tokens
const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export const AuthActions = () => {
  return {
    login,
    register,
  };
};

// Function to log in
const login = async (credentials: Credentials): Promise<void> => {
  try {
    // Make a POST request to the login endpoint with credentials
    const response: AxiosResponse<any> = await axios.post(
      "/api/login",
      credentials,
    );
    // Extract access token and refresh token from the response
    const { access, refresh } = response.data;
    // Set access and refresh tokens in cookies
    setAccessToken(access);
    setRefreshToken(refresh);
  } catch (error) {
    throw new Error("Login failed"); // Throw an error if login fails
  }
};

// Function to log out
const logout = async (): Promise<void> => {
  try {
    // Make a POST request to the logout endpoint
    await axios.post("/api/logout");
    // Remove access and refresh tokens from cookies
    removeAccessToken();
    removeRefreshToken();
  } catch (error) {
    throw new Error("Logout failed"); // Throw an error if logout fails
  }
};

// Function to register user
export const register = async (userData: RegistrationData): Promise<void> => {
  try {
    // Make a POST request to the register endpoint with user data
    await axios.post("/api/register", userData);
  } catch (error) {
    throw new Error("Registration failed"); // Throw an error if registration fails
  }
};

// Function to set access token in cookies
const setAccessToken = (accessToken: string): void => {
  Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, { expires: 1 }); // Expires in 1 day
};

// Function to get access token from cookies
export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_COOKIE);
};

// Function to remove access token from cookies
const removeAccessToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
};

// Function to set refresh token in cookies
const setRefreshToken = (refreshToken: string): void => {
  Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, { expires: 7 }); // Expires in 7 days
};

// Function to get refresh token from cookies
export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_COOKIE);
};

// Function to remove refresh token from cookies
const removeRefreshToken = (): void => {
  Cookies.remove(REFRESH_TOKEN_COOKIE);
};
