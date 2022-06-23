import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logoutStart } from '../authenticate/store/auth.action';
import { getAuthState, getToken } from '../authenticate/store/auth.selector';
import { AppState } from '../store/app-state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;
  subs!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs = this.store.select(getAuthState).subscribe((data) => {
      this.authenticated = data;
    })
  }

  logout() {
    this.store.dispatch(logoutStart());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
