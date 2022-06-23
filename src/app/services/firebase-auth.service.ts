import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthorizedUser } from '../authenticate/models/authorized-user.model';
import { TokenInfo } from '../authenticate/models/token-info.model';
import { user } from '../authenticate/models/user.model';
import { Post } from '../post/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseEndPointAuth: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  firebaseEndPointPost: string = 'https://expertrecassignment-default-rtdb.firebaseio.com/'
  webApiKey: string = 'AIzaSyCa7BzWMl7FLXeSkdJgpod5JIdiunGUnqU';
  authenticatedSub$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) { }

  signIn(payload: user): Observable<AuthorizedUser> {
    const modifiedPayLoad = { ...payload, returnSecureToken: true };
    return this.http.post<AuthorizedUser>(`${this.firebaseEndPointAuth}signInWithPassword?key=${this.webApiKey}`, modifiedPayLoad);
  }

  setAuth(data: TokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(data));
  }

  signUp(payload: user): Observable<AuthorizedUser> {
    const modifiedPayLoad = { ...payload, returnSecureToken: true };
    return this.http.post<AuthorizedUser>(`${this.firebaseEndPointAuth}signUp?key=${this.webApiKey}`, modifiedPayLoad);
  }

  clearAuth() {
    localStorage.removeItem('tokenInfo');
  }

  postData(payload: Post) {
    return this.http.post<any>(`${this.firebaseEndPointPost}posts.json`, payload).pipe(catchError(this.handleError))
  }

  getpostData(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.firebaseEndPointPost}posts.json`).pipe(map((data) => {
      let result: Post[] = [];
      for (let key in data) {
        result.push({ ...data[key], key });
      }
      return result;
    }), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage: string = '';
    if (error.error.error instanceof Error) {
      errorMessage = `client Side Error: ${error?.error?.error?.message ?? error?.error?.error}`;
    } else {
      errorMessage = `Server Side Error: ${error?.error?.error?.message ?? error?.error?.error}`;
    }
    return throwError(() => errorMessage);
  }

}
