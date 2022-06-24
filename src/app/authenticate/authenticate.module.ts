import { NgModule } from '@angular/core';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceHolderDirective } from './directives/place-holder.directive';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [
    AuthComponent,
    PlaceHolderDirective,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    SharedModule,
    AuthenticateRoutingModule,
    EffectsModule.forFeature([]),
  ],
  providers: [
  ]
})
export class AuthenticateModule { }
