import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInfo } from './authenticate/models/token-info.model';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  clearAutoLogout: any;

  constructor(private firebackend: FirebaseAuthService, private router: Router) { }


  ngOnInit() {
    this.autoLogin();
    this.firebackend.authenticatedSub$.subscribe({
      next: (data) => {
        if (data !== null) {
          this.autoLogout(data);
        }
      }
    });
  }

  autoLogin() {
    let data: string | null = localStorage.hasOwnProperty('tokenInfo') ? localStorage.getItem("tokenInfo") : null;
    let finaldata: TokenInfo;
    if (data !== null) {
      finaldata = JSON.parse(data, (key, value) => {
        return key === 'expiresIn' ? new Date(value) : value
      });
      if (finaldata.expiresIn > new Date()) {
        this.firebackend.authenticatedSub$.next(finaldata);
        clearTimeout(this.clearAutoLogout);
        this.autoLogout(finaldata);
      } else {
        this.logoutClicked();
      }
    }
  }

  autoLogout(data: TokenInfo) {
    let time = (data.expiresIn.getTime() - new Date().getTime());
    this.clearAutoLogout = setTimeout(() => {
      this.logout();
    }, time)
  }

  logout() {
    localStorage.removeItem("tokenInfo");
    this.firebackend.authenticatedSub$.next(null);
    this.router.navigateByUrl('auth');
  }

  logoutClicked(event?: boolean) {
    clearTimeout(this.clearAutoLogout);
    this.logout();
  }

}
