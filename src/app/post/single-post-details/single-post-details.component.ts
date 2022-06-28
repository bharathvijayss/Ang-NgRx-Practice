import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { Post } from '../models/post.model';
import { getPostForId } from '../store/post.selector';

@Component({
  selector: 'app-single-post-details',
  templateUrl: './single-post-details.component.html',
  styleUrls: ['./single-post-details.component.css']
})
export class SinglePostDetailsComponent implements OnInit {

  singlePost!: Post;
  storeSubs!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSubs = this.store.select(getPostForId).subscribe((data) => {
      if (data) {
        this.singlePost = data;
      }
    })
  }

  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  }

}
