import { createAction, props } from "@ngrx/store";
import { Post } from "../models/post.model";
import { postState } from "./post.state";



export const ADD_POST_START = '[Post Module] Start adding the post';
export const ADD_POST_SUCCESS = '[Post Module] Success adding the post';
export const GET_POST_START = '[Post Module] Start getting the post';
export const GET_POST_SUCCESS = '[Post Module] Success getting the post';
export const UPDATE_POST_START = '[Post Module] Start updating the post';
export const UPDATE_POST_SUCCESS = '[Post Module] Success updating the post';
export const DELETE_POST_START = '[Post Module] Start deleting the post';
export const DELETE_POST_SUCCESS = '[Post Module] Success deleting the post';

export const addPostStart = createAction(ADD_POST_START, props<{ postedBy: string, postName: string }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<Post>());
export const getPostStart = createAction(GET_POST_START);
export const getPostSuccess = createAction(GET_POST_SUCCESS, props<postState>());
export const updatePostStart = createAction(UPDATE_POST_START, props<Post>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<Post>());
export const deletePostStart = createAction(DELETE_POST_START, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());