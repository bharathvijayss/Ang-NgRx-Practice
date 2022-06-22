import { COUNTER_STATE_NAME } from "../counter/store/counter.selector";
import { CounterState } from "../counter/store/counter.state";
import { POST_STATE_NAME } from "../post/store/post.selector";
import { postState } from "../post/store/post.state";
import { sharedReducer } from "./shared.reducer";
import { SHARED_STATE_NAME } from "./shared.selector";
import { sharedState } from "./shared.state";

export interface AppState {
    [COUNTER_STATE_NAME]: CounterState,
    [POST_STATE_NAME]: postState,
    [SHARED_STATE_NAME]: sharedState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer
}