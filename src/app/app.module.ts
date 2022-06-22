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
import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SHARED_STATE_NAME } from './store/shared.selector';
import { sharedReducer, _sharedReducer } from './store/shared.reducer';
import { appReducer } from './store/app-state';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    //@ts-ignore
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
