import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

const sharedStateData = createFeatureSelector<sharedState>(SHARED_STATE_NAME);

export const getErrorMessage = createSelector(sharedStateData, (state)=> {
    return state.errorMsg;
});

export const getLoadingState = createSelector(sharedStateData, (state)=> {
    return state.showLoader;
});
