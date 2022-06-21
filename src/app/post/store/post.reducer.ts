import { ActivatedRouteSnapshot } from "@angular/router";
import { Action, createReducer, on } from "@ngrx/store";
import { Post } from "../models/post.model";
import { addPostSuccess, deletePostSuccess, getPostSuccess, updatePostSuccess } from "./post.action";
import { postStateName } from "./post.selector";
import { initialState, postState } from "./post.state";

export const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        const newpost: Post = { postName: action.postName, postedBy: action.postedBy, key: action.key };
        return {
            ...state,
            posts: [...state.posts, newpost]
        }
    }),
    on(updatePostSuccess, (state, action) => {
        const newPostarr: Post[] = state.posts.map((post: Post) => {
            return post.key === action.key ? action : post;
        })
        return {
            ...state,
            posts: newPostarr
        }
    }),
    on(getPostSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(deletePostSuccess, (state, action) => {
        const newPostArr = state.posts.filter((post: Post) => {
            return post.key !== action.id;
        })
        return {
            ...state,
            posts: newPostArr
        }
    })
)

export function postReducer(state: postState, action: Action) {
    return _postReducer(state, action);
}