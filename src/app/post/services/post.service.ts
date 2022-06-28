import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { FireBasePost } from '../models/firebase_post.model';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {

  firebaseEndPointPost: string = 'https://expertrecassignment-default-rtdb.firebaseio.com/'
  webApiKey: string = 'AIzaSyCa7BzWMl7FLXeSkdJgpod5JIdiunGUnqU';

  constructor(private http: HttpClient) { }

  addpostData(payload: { postName: string, postedBy: string }) {
    return this.http.post<{ name: string }>(`${this.firebaseEndPointPost}posts.json`, payload).pipe(
      map(data => {
        const addedPost: Post = { ...payload, key: data.name };
        return addedPost;
      })
    )
  }

  getpostData(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.firebaseEndPointPost}posts.json`).pipe(map((data) => {
      let result: Post[] = [];
      for (let key in data) {
        result.push({ ...data[key], key });
      }
      return result;
    }))
  }

  deletePost(id: string) {
    return this.http.delete(`${this.firebaseEndPointPost}posts/${id}.json`);
  }

  getpostDataForId(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.firebaseEndPointPost}posts/${id}.json`);
  }

  updatePostData(payload: FireBasePost) {
    return this.http.patch(`${this.firebaseEndPointPost}posts.json`, payload);
  }

  // handleError(error: HttpErrorResponse) {
  //   console.log(error);
  //   let errorMessage: string = '';
  //   if (error.error.error instanceof Error) {
  //     errorMessage = `client Side Error: ${error?.error?.error?.message ?? error?.error?.error}`;
  //   } else {
  //     errorMessage = `Server Side Error: ${error?.error?.error?.message ?? error?.error?.error}`;
  //   }
  //   return throwError(() => errorMessage);
  // }

}
