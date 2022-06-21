import { CounterState } from "../counter/store/counter.state";
import { postState } from "../post/store/post.state";

export interface AppState {
    counter: CounterState,
    post: postState
}