import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import { Post } from '../models/post.model';
import { deletePostStart, getPostStart } from '../store/post.action';
import { getallPost } from '../store/post.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  postsData$!: Observable<Post[]>
  show: boolean = false;
  postSubscription!: Subscription;

  constructor(private store: Store<AppState>) { 
    this.store.dispatch(setLoadingSpinner({ loading: true }));
  }

  ngOnInit(): void {
    this.store.dispatch(getPostStart());
    this.getPostData();
  }

  getPostData() {
    this.postsData$ = this.store.select(getallPost);
    // this.postSubscription = this.postsData$.subscribe(data => {
    //   console.log(data);
    //   if (data.length > 0) {
    //     this.show = true;
    //   } else {
    //     this.show = false;
    //   }
    // })
  }

  deletePost(id: string) {
    this.store.dispatch(setLoadingSpinner({ loading: true }));
    this.store.dispatch(deletePostStart({ id }));
  }

  ngOnDestroy() {
    // this.postSubscription.unsubscribe();
  }

}
