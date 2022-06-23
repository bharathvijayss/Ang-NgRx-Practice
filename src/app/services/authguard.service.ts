import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, Subscription, take } from "rxjs";
import { getAuthState, getToken } from "../authenticate/store/auth.selector";
import { AppState } from "../store/app-state";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    subscribedData!: boolean | UrlTree;

    constructor(private firebackend: FirebaseAuthService, private router: Router, private store: Store<AppState>) {
        this.store.select(getAuthState).pipe(take(1)).subscribe((data) => {
            this.subscribedData = data === false ? this.router.createUrlTree(['/auth']) : true;
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.subscribedData;
    }

}