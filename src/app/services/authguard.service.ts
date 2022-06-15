import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private firebackend: FirebaseAuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.firebackend.authenticatedSub$.pipe(take(1), map(
            (data) => {
                if (data === null) {
                    return this.router.createUrlTree(['/auth']);
                } else {
                    return true;
                }
            }
        ));
    }
}