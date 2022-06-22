import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import { Post } from '../models/post.model';
import { updatePostStart } from '../store/post.action';
import { getPostForId } from '../store/post.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @ViewChild('postForm') postForm!: NgForm;
  postNamevar: string = '';
  postedByvar: string = '';
  editPostData!: Post;
  paramKey!: string;
  storeSelect!: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      //@ts-ignore
      this.paramKey = data.get('id');
      // this.store.select(getPostForId, { key: this.paramKey }).subscribe((data) => {
      this.storeSelect = this.store.select(getPostForId(this.paramKey)).subscribe((data) => {
        //@ts-ignore
        this.setFormData(data);
      })

    });
  }

  setFormData(data: Post) {
    this.postNamevar = data.postName;
    this.postedByvar = data.postedBy;
  }

  EditData() {
    this.store.dispatch(setLoadingSpinner({ loading: true }));
    this.store.dispatch(updatePostStart({ key: this.paramKey, ...this.postForm.value }));
  }

  getPostNameErrors(ref: NgModel) {
    if (ref?.errors?.['required']) {
      return 'Post Name is Mandatory';
    }
    return null;
  }

  getPostedByErrors(ref: NgModel) {
    if (ref?.errors?.['required']) {
      return 'PostedBy who is Mandatory';
    }
    return null;
  }

  ngOnDestroy() {
    this.storeSelect.unsubscribe();
  }

}
