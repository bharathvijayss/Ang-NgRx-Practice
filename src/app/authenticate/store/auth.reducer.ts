import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, logoutSuccess, signUpSuccess } from "./auth.action";
import { authState, initialState } from "./auth.state";

export function authReducer(state: authState, action: Action) {
    return _authReducer(state, action);
}

const _authReducer = createReducer(initialState,
    on(...[loginSuccess, signUpSuccess], (state, action) => {
        return {
            ...state,
            authData: action.tokenData
        }
    }),
    on(logoutSuccess, (state) => {
        return {
            ...state,
            authData: null
        }
    })
);