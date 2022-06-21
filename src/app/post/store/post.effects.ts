import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs";
import { FireBasePost } from "../models/firebase_post.model";
import { PostService } from "../services/post.service";
import { addPostStart, addPostSuccess, deletePostStart, deletePostSuccess, getPostStart, getPostSuccess, updatePostStart, updatePostSuccess } from "./post.action";

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService, private router: Router) {
    }

    getPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(getPostStart), exhaustMap((action) => {
            return this.postService.getpostData().pipe(map((posts) => {
                return getPostSuccess({ posts })
            }),
                // catchError((error)=>{
                //error message and global loader missing.
                // })
            )
        }))
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(deletePostStart), exhaustMap((action) => {
            return this.postService.deletePost(action.id).pipe(map(data => {
                return deletePostSuccess({ id: action.id })
            }),
                // catchError((error)=>{
                //error message and global loader missing.
                // })
            )
        }))
    })

    addPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(addPostStart), exhaustMap((action) => {
            const post = { postedBy: action.postedBy, postName: action.postName };
            return this.postService.addpostData(post).pipe(map(data => {
                return addPostSuccess(data);
            }),
                // catchError((error)=>{
                //error message and global loader missing.
                // })
            )
        }))
    })

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(updatePostStart), exhaustMap((action) => {
            const postToUpdate: FireBasePost = {
                [action.key]: {
                    postedBy: action.postedBy,
                    postName: action.postName
                }
            }
            return this.postService.updatePostData(postToUpdate).pipe(map(data => {
                return updatePostSuccess({ key: action.key, postedBy: action.postedBy, postName: action.postName });
            }))
        }))
    })

    addPostRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[addPostSuccess, updatePostSuccess]), map((action) => {
            this.router.navigateByUrl('posts');
        }))
    }, { dispatch: false })


}