import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";

export const SHARED_AUTH_STATE_NAME = 'auth';

const sharedAuthStateData = createFeatureSelector<authState>(SHARED_AUTH_STATE_NAME);

export const getToken = createSelector(sharedAuthStateData, (state) => {
    return state.authData?.idToken;
});

export const getExpirtyDate = createSelector(sharedAuthStateData, (state) => {
    return state.authData?.expiresIn;
});

export const getAuthState = createSelector(sharedAuthStateData, (state) => {
    return state.authData === null ? false : true;
});