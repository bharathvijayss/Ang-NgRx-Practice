import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import { addPostStart } from '../store/post.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @ViewChild('postForm') postForm!: NgForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  postData() {
    this.store.dispatch(setLoadingSpinner({ loading: true }));
    this.store.dispatch(addPostStart(this.postForm.value));
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

}
