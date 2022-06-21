import { Post } from "../models/post.model";


export interface postState {
    posts: Post[] | [];
}

export const initialState: postState = {
    posts: []
};