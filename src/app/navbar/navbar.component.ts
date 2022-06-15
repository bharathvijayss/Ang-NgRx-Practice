import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;
  @Output() logoutEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private firebackend: FirebaseAuthService) { }

  ngOnInit(): void {
    this.firebackend.authenticatedSub$.subscribe({
      next: (data) => {
        this.authenticated = (data === null ? false : true);
      }
    })
  }

  logout() {
    this.logoutEvent.emit(true);
  }

}
