import { createSelector } from "@reduxjs/toolkit";

export const getAccessToken = (state) => state.auth.accessToken;
export const getRefreshToken = (state) => state.auth.refreshToken;
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

export const getUserId = (state) => state.auth.userId;
