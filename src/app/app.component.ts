import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TokenInfo } from './authenticate/models/token-info.model';
import { loginSuccess } from './authenticate/store/auth.action';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { AppState } from './store/app-state';
import { getErrorMessage, getLoadingState } from './store/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // clearAutoLogout: any;
  loading!: boolean;
  errorMsg$!: Observable<string>;
  sub!: Subscription;
  constructor(private firebackend: FirebaseAuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.autoLogin();
    // this.autoLogin();
    // this.firebackend.authenticatedSub$.subscribe({
    //   next: (data) => {
    //     if (data !== null) {
    //       this.autoLogout(data);
    //     }
    //   }
    // });
    this.getLoaderAndError();
  }

  getLoaderAndError() {
    this.sub = this.store.select(getLoadingState).subscribe(data => {
      this.loading = data;
    });
    this.errorMsg$ = this.store.select(getErrorMessage);
  }

  autoLogin() {
    const tokenInformation: TokenInfo | null = this.firebackend.getAuth();
    if (tokenInformation) {
      const redirect: boolean = window.location.pathname.includes('auth');
      this.store.dispatch(loginSuccess({ tokenData: tokenInformation, redirect }))
    }
  }

  // autoLogin() {
  //   let data: string | null = localStorage.hasOwnProperty('tokenInfo') ? localStorage.getItem("tokenInfo") : null;
  //   let finaldata: TokenInfo;
  //   if (data !== null) {
  //     finaldata = JSON.parse(data, (key, value) => {
  //       return key === 'expiresIn' ? new Date(value) : value
  //     });
  //     if (finaldata.expiresIn > new Date()) {
  //       this.firebackend.authenticatedSub$.next(finaldata);
  //       clearTimeout(this.clearAutoLogout);
  //       this.autoLogout(finaldata);
  //     } else {
  //       this.logoutClicked();
  //     }
  //   }
  // }

  // autoLogout(data: TokenInfo) {
  //   let time = (data.expiresIn.getTime() - new Date().getTime());
  //   this.clearAutoLogout = setTimeout(() => {
  //     this.logout();
  //   }, time)
  // }

  // logout() {
  //   localStorage.removeItem("tokenInfo");
  //   this.firebackend.authenticatedSub$.next(null);
  //   this.router.navigateByUrl('auth');
  // }

  // logoutClicked(event?: boolean) {
  //   clearTimeout(this.clearAutoLogout);
  //   this.logout();
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
