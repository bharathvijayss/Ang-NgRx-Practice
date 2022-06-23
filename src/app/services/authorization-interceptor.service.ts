import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable, Subscription, switchMap, take, tap } from "rxjs";
import { AuthorizedUser } from "../authenticate/models/authorized-user.model";
import { getAuthState, getToken } from "../authenticate/store/auth.selector";
import { AppState } from "../store/app-state";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {

    constructor(private store: Store<AppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.store.select(getToken).pipe(take(1), exhaustMap((data) => {
            if (!req.url.includes('identitytoolkit') && data) {
                req = req.clone({
                    params: req.params.append('auth', data)
                })
                return next.handle(req);
            }
            return next.handle(req);
        }))



    }
}