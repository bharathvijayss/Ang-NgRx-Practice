import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthGuardService } from './services/authguard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full'
  }, {
    path: 'posts',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule),
    canActivate: [AuthGuardService]
  }, {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule),
    canActivate: [AuthGuardService]
  }, {
    path: 'auth',
    loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
  },
  {
    path: '**',
    redirectTo: 'counter',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
