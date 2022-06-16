import { NgModule } from '@angular/core';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceHolderDirective } from './directives/place-holder.directive';


@NgModule({
  declarations: [
    AuthComponent,
    PlaceHolderDirective
  ],
  imports: [
    SharedModule,
    AuthenticateRoutingModule
  ],
  providers: [
  ]
})
export class AuthenticateModule { }
