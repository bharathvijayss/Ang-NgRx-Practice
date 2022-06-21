import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "../models/post.model";
import { postState } from "./post.state";


export const postStateName = 'post';

const postStateData = createFeatureSelector<postState>(postStateName);

export const getallPost = createSelector(postStateData, (state) => {
    return state.posts;
})

export function getPostForId(id: string) {
    return createSelector(postStateData, (state) => {
        return state.posts.length > 0 ? state.posts.find((data: Post) => {
            if (data.key === id) {
                return true;
            }
            return false;
        }) : { postedBy: '', postName: '' };
    })
};

// export const getPostForId = createSelector(postStateData, (state: any, payload: any) => {
//     return state.posts.find((data: Post) => {
//         if (data.key === payload.key) {
//             return true;
//         }
//         return false;
//     })
// })