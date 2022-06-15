import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, take, tap } from "rxjs";
import { AuthorizedUser } from "../authenticate/models/authorized-user.model";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {

    constructor(private firebackend: FirebaseAuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('identitytoolkit')) {
            return this.firebackend.authenticatedSub$.pipe(take(1), switchMap((authData: AuthorizedUser) => {
                req = req.clone({
                    params: req.params.append('auth', authData.idToken)
                })
                return next.handle(req);
            }))
        }
        return next.handle(req);
    }
}