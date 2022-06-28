import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/custom-route-serializer";
import { getRouterStateData } from "src/app/store/router.selector";
import { Post } from "../models/post.model";
import { postState } from "./post.state";


export const POST_STATE_NAME = 'post';

const postStateData = createFeatureSelector<postState>(POST_STATE_NAME);

export const getallPost = createSelector(postStateData, (state) => {
    return state.posts;
})

// export function getPostForId(id: string) {
//     return createSelector(postStateData, (state) => {
//         return state.posts.length > 0 ? state.posts.find((data: Post) => {
//             if (data.key === id) {
//                 return true;
//             }
//             return false;
//         }) : { postedBy: '', postName: '' };
//     })
// };

// export const getPostForId = createSelector(postStateData, (state: any, payload: any) => {
//     return state.posts.find((data: Post) => {
//         if (data.key === payload.key) {
//             return true;
//         }
//         return false;
//     })
// })

export const getPostForId = createSelector(getallPost, getRouterStateData, (posts: Post[], route: RouterStateUrl) => {
    return posts ? posts.find((data: Post) => {
        if (data.key === route.params["id"]) {
            return true;
        }
        return false;
    }) : null;
})