import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  @ViewChild('postForm') postForm!: NgForm;
  errorMsg: string = '';
  postingData: boolean = false;
  postsData: Post[] = [];

  constructor(private firebackend: FirebaseAuthService) { }

  ngOnInit(): void {
    this.getPostData();
  }

  postData() {
    this.postingData = true;
    this.firebackend.postData(this.postForm.value as Post).subscribe({
      next: (response) => {
        this.postingData = false;
        this.getPostData();
      },
      error: (error) => {
        this.postingData = false;
        this.errorMsg = error;
      }
    })
  }

  getPostData() {
    this.postingData = true;
    this.firebackend.getpostData().subscribe({
      next: (response) => {
        this.postsData = response as Post[];
        this.postingData = false;
      },
      error: (error) => {
        this.postingData = false;
        this.errorMsg = error;
      }
    })
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
