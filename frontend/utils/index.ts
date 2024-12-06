import Cookies from "js-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const AUTH_TOKENS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

// Client-side token management
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(AUTH_TOKENS.ACCESS_TOKEN, accessToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 1, // 1 day expiration
  });
  Cookies.set(AUTH_TOKENS.REFRESH_TOKEN, refreshToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 7, // 7 days expiration
  });
};

export const getAccessToken = () => {
  return Cookies.get(AUTH_TOKENS.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return Cookies.get(AUTH_TOKENS.REFRESH_TOKEN);
};

export const removeAuthTokens = () => {
  Cookies.remove(AUTH_TOKENS.ACCESS_TOKEN);
  Cookies.remove(AUTH_TOKENS.REFRESH_TOKEN);
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Server-side token management
export const setServerAuthTokens = (
  cookies: RequestCookies | ReadonlyRequestCookies,
  accessToken: string,
  refreshToken: string
) => {
  cookies.set({
    name: AUTH_TOKENS.ACCESS_TOKEN,
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60, // 1 day
  });

  cookies.set({
    name: AUTH_TOKENS.REFRESH_TOKEN,
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
};

export const getServerAccessToken = (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  return cookies.get(AUTH_TOKENS.ACCESS_TOKEN)?.value;
};

export const removeServerAuthTokens = (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  cookies.delete(AUTH_TOKENS.ACCESS_TOKEN);
  cookies.delete(AUTH_TOKENS.REFRESH_TOKEN);
};

export const getServerAuthStatus = (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  return !!getServerAccessToken(cookies);
};
