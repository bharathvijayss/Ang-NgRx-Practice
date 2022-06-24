import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthorizedUser } from '../authenticate/models/authorized-user.model';
import { TokenInfo } from '../authenticate/models/token-info.model';
import { user } from '../authenticate/models/user.model';
import { logoutStart } from '../authenticate/store/auth.action';
import { Post } from '../post/models/post.model';
import { AppState } from '../store/app-state';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseEndPointAuth: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  firebaseEndPointPost: string = 'https://expertrecassignment-default-rtdb.firebaseio.com/'
  webApiKey: string = 'AIzaSyCa7BzWMl7FLXeSkdJgpod5JIdiunGUnqU';
  authenticatedSub$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  timeoutSubs!: any;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  signIn(payload: user): Observable<AuthorizedUser> {
    const modifiedPayLoad = { ...payload, returnSecureToken: true };
    return this.http.post<AuthorizedUser>(`${this.firebaseEndPointAuth}signInWithPassword?key=${this.webApiKey}`, modifiedPayLoad);
  }

  setAuth(data: TokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(data));
    this.setAutoLogout(data);
  }

  getAuth() {
    const authData = localStorage.getItem('tokenInfo');
    let modifiedauthData: TokenInfo;
    if (authData) {
      modifiedauthData = JSON.parse(authData, (key, value) => {
        if (key === 'expiresIn') {
          return new Date(value);
        }
        return value;
      });
      if (modifiedauthData.expiresIn > new Date()) {
        this.setAutoLogout(modifiedauthData);
        return modifiedauthData;
      } else {
        localStorage.removeItem('tokenInfo');
      }
    }
    return null;
  }

  setAutoLogout(data: TokenInfo) {
    const timeout = data.expiresIn.getTime() - new Date().getTime();
    this.timeoutSubs = setTimeout(() => {
      this.store.dispatch(logoutStart());
    }, timeout);
  }

  signUp(payload: user): Observable<AuthorizedUser> {
    const modifiedPayLoad = { ...payload, returnSecureToken: true };
    return this.http.post<AuthorizedUser>(`${this.firebaseEndPointAuth}signUp?key=${this.webApiKey}`, modifiedPayLoad);
  }

  clearAuth() {
    if (this.timeoutSubs) {
      clearTimeout(this.timeoutSubs);
      this.timeoutSubs = null;
    }    
    localStorage.removeItem('tokenInfo');
  }

}
