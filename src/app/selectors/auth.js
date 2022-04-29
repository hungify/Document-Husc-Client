import { createSelector } from "@reduxjs/toolkit";

const getAccessToken = (state) => state.auth.accessToken;
const getRefreshToken = (state) => state.auth.refreshToken;
export const getToken = createSelector(
  getAccessToken,
  getRefreshToken,
  (accessToken, refreshToken) => ({
    accessToken,
    refreshToken,
  })
);

export const getRole = (state) => state.auth.role;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
