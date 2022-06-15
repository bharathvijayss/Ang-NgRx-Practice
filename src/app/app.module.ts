import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,   
    SharedModule,
    AuthenticateModule,
    PostModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
