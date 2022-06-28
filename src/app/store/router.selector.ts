import { RouterReducerState, RouterState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-route-serializer";

const routerStateData = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getRouterStateData = createSelector(routerStateData, (router)=> {
    return router.state;
})