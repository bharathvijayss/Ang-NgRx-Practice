import { Action, createReducer, on } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "./shared.action";
import { initialState, sharedState } from "./shared.state";

export const _sharedReducer = createReducer(initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoader: action.loading
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMsg: action.message
        }
    })
)

export function sharedReducer(state: sharedState, action: Action) {
    return _sharedReducer(state, action);
}
