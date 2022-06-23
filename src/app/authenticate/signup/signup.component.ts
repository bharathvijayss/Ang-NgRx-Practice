import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import { signUpStart } from '../store/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('authForm') authForm!: NgForm;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  signUp() {
    this.store.dispatch(setLoadingSpinner({ loading: true }));
    this.store.dispatch(signUpStart({ userData: this.authForm.value }));
  }

  switchToSignIn() {
    this.router.navigateByUrl('auth/signIn');
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
