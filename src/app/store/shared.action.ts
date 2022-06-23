import { createAction, props } from "@ngrx/store";

export const SET_LOADING_SPINNER_STATE = '[Shared Module] Set Loading Spinner State';
export const SET_ERROR_MESSAGE = '[Shared Module] Set Error Message';


export const setLoadingSpinner = createAction(SET_LOADING_SPINNER_STATE, props<{ loading: boolean }>());
export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{ message: string }>())
