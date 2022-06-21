import { Action, createReducer, on } from "@ngrx/store";
import { decrementCounter, incrementCounter, resetCounter, setCounter } from "./counter.action";
import { CounterState, initialState } from "./counter.state";

const _counterReducer = createReducer(initialState,
    on(resetCounter, (state) => {
        return {
            ...state,
            count: 0
        }
    }),
    on(incrementCounter, (state) => {
        return {
            ...state,
            count: state.count + 1
        }
    }),
    on(decrementCounter, (state) => {
        return {
            ...state,
            count: state.count - 1
        }
    }),
    on(setCounter, (state, action) => {
        return {
            ...state,
            count: action.count
        }
    })
)

export function counterReducer(state: CounterState, action: Action) {
    return _counterReducer(state, action);
}