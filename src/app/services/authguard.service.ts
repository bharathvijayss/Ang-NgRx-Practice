import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, of, Subscription, take } from "rxjs";
import { getAuthState, getToken } from "../authenticate/store/auth.selector";
import { AppState } from "../store/app-state";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private store: Store<AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(getAuthState).pipe(take(1), exhaustMap((data) => {
            if (data) {
                return of(true);
            }
            return of(this.router.createUrlTree(['/auth']));
        }))
    }

}