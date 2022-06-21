import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";
export const COUNTER_STATE_NAME = 'counter';

export const counterStateData = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const fetchCountValue = createSelector(counterStateData, (state) => {
    return state.count;
})