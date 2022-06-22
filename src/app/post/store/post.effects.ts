import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, finalize, map, of } from "rxjs";
import { AppState } from "src/app/store/app-state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared.action";
import { FireBasePost } from "../models/firebase_post.model";
import { PostService } from "../services/post.service";
import { addPostStart, addPostSuccess, deletePostStart, deletePostSuccess, getPostStart, getPostSuccess, updatePostStart, updatePostSuccess } from "./post.action";

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService, private router: Router, private store: Store<AppState>) {
    }

    getPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(getPostStart), exhaustMap((action) => {
            return this.postService.getpostData().pipe(map((posts) => {
                return getPostSuccess({ posts })
            }),
                catchError((error) => {
                    return of(setErrorMessage({ message: `Error Occured: ${error.error.error}` }));
                }), finalize(() => {
                    this.store.dispatch(setLoadingSpinner({ loading: false }));
                })
            )
        }))
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(deletePostStart), exhaustMap((action) => {
            return this.postService.deletePost(action.id).pipe(map(data => {
                return deletePostSuccess({ id: action.id })
            }),
                catchError((error) => {
                    return of(setErrorMessage({ message: `Error Occured: ${error.error.error}` }));
                }), finalize(() => {
                    this.store.dispatch(setLoadingSpinner({ loading: false }));
                })
            )
        }))
    })

    addPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(addPostStart), exhaustMap((action) => {
            const post = { postedBy: action.postedBy, postName: action.postName };
            return this.postService.addpostData(post).pipe(map(data => {
                return addPostSuccess(data);
            }),
                catchError((error) => {
                    return of(setErrorMessage({ message: `Error Occured: ${error.error.error}` }));
                }), finalize(() => {
                    this.store.dispatch(setLoadingSpinner({ loading: false }));
                })
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
            }),
                catchError((error) => {
                    return of(setErrorMessage({ message: `Error Occured: ${error.error.error}` }));
                }), finalize(() => {
                    this.store.dispatch(setLoadingSpinner({ loading: false }));
                })
            )
        }))
    })

    addPostRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[addPostSuccess, updatePostSuccess]), map((action) => {
            this.router.navigateByUrl('posts');
        }))
    }, { dispatch: false })


}