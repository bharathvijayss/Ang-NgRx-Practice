import { NgModule } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post.effects';
import { POST_STATE_NAME } from './store/post.selector';
import { postReducer } from './store/post.reducer';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostService } from './services/post.service';
import { SinglePostDetailsComponent } from './single-post-details/single-post-details.component';


@NgModule({
  declarations: [
    PostDetailsComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostDetailsComponent
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    EffectsModule.forFeature([PostEffects]),
  ], 
  providers: [
    PostService
  ]
})
export class PostModule { }
