import { NgModule } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    SharedModule,
    PostRoutingModule
  ]
})
export class PostModule { }
