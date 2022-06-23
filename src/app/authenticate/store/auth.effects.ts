import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
import { AppState } from "src/app/store/app-state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared.action";
import { AuthorizedUser } from "../models/authorized-user.model";
import { TokenInfo } from "../models/token-info.model";
import { loginStart, loginSuccess, logoutStart, logoutSuccess, signUpStart, signUpSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private firebackend: FirebaseAuthService, private store: Store<AppState>, private router: Router) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(ofType(loginStart), exhaustMap((action) => {
            return this.firebackend.signIn(action.userData).pipe(map((res: AuthorizedUser) => {
                const tokenData: TokenInfo = {
                    idToken: res.idToken,
                    refreshToken: res.refreshToken,
                    expiresIn: new Date(new Date().getTime() + +res.expiresIn)
                };
                this.firebackend.setAuth(tokenData);
                this.store.dispatch(setErrorMessage({ message: '' }));
                return loginSuccess({ tokenData });
            }), catchError((error) => {
                return of(setErrorMessage({ message: error.error.error.message }));
            }), finalize(() => {
                this.store.dispatch(setLoadingSpinner({ loading: false }));
            }))
        }))
    })

    signUp$ = createEffect(() => {
        return this.actions$.pipe(ofType(signUpStart), exhaustMap((action) => {
            return this.firebackend.signUp(action.userData).pipe(map((res: AuthorizedUser) => {
                const tokenData: TokenInfo = {
                    idToken: res.idToken,
                    refreshToken: res.refreshToken,
                    expiresIn: new Date(new Date().getTime() + +res.expiresIn)
                };
                this.firebackend.setAuth(tokenData);
                this.store.dispatch(setErrorMessage({ message: '' }));
                return signUpSuccess({ tokenData });
            }), catchError((error) => {
                console.log(error);
                return of(setErrorMessage({ message: error.error.error.message }));
            }), finalize(() => {
                this.store.dispatch(setLoadingSpinner({ loading: false }));
            }))
        }))
    })

    loginOrSignupSuccess$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[loginSuccess, signUpSuccess]), tap((data) => {
            this.router.navigateByUrl('/posts');
        }))
    }, { dispatch: false })

    logout$ = createEffect(() => {
        return this.actions$.pipe(ofType(logoutStart), map((action) => {
            this.firebackend.clearAuth();
            return logoutSuccess();
        }))
    })

    logoutSuccess$ = createEffect(() => {
        return this.actions$.pipe(ofType(logoutSuccess), tap((data) => {
            this.router.navigateByUrl('/auth');
        }))
    }, { dispatch: false })

}