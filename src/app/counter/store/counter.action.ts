import { createAction, props } from "@ngrx/store";

export const SET_COUNTER = '[Counter Page] set the counter state with value';
export const RESET_COUNTER = '[Counter Page] reset the counter value';
export const INCREMENT_COUNTER = '[Counter Page] Increment the counter value';
export const DECREMENT_COUNTER = '[Counter Page] Decrement the counter value';

export const setCounter = createAction(SET_COUNTER, props<{ count: number }>());
export const resetCounter = createAction(RESET_COUNTER);
export const incrementCounter = createAction(INCREMENT_COUNTER);
export const decrementCounter = createAction(DECREMENT_COUNTER);