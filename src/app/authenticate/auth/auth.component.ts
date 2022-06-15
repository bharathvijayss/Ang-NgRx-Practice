import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizedUser } from '../models/authorized-user.model';
import { user } from '../models/user.model';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { TokenInfo } from '../models/token-info.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  errorMsg: string = '';
  @ViewChild('authForm') authForm!: NgForm;
  authResp$!: Observable<AuthorizedUser>;
  isAuthenticating: boolean = false;

  constructor(private firebackend: FirebaseAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  validateCredentials() {
    this.isAuthenticating = true;
    if (this.isLogin) {
      this.authResp$ = this.firebackend.signIn(this.authForm.value as user);
    } else {
      this.authResp$ = this.firebackend.signUp(this.authForm.value as user);
    }
    this.authResp$.subscribe({
      next: (response: AuthorizedUser) => {
        this.isAuthenticating = false;
        let tokenObj: TokenInfo = { idToken: response.idToken, refreshToken: response.refreshToken, expiresIn: new Date(new Date().getTime() + (+response.expiresIn * 1000)) };
        localStorage.setItem('tokenInfo', JSON.stringify(tokenObj));
        this.firebackend.authenticatedSub$.next(tokenObj);
        this.router.navigateByUrl('posts');
      },
      error: (error: string) => {
        this.isAuthenticating = false;
        this.errorMsg = error;
      }
    })
  }

  fetchErrorEmail(ref: NgModel) {
    if (ref?.errors?.['required']) {
      return 'Email is Required';
    } else if (ref?.errors?.['email']) {
      return 'Email is invalid';
    }
    return null;
  }

  fetchErrorPassword(ref: NgModel) {
    if (ref?.errors?.['required']) {
      return 'Password is Required';
    } else if (ref?.errors?.['minlength']) {
      return 'Password should be atleast 6 chars length';
    }
    return null;
  }


}
