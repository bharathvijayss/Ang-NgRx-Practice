import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/authguard.service';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [{
  path: 'posts',
  component: PostDetailsComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
