import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { fetchCountValue } from '../store/counter.selector';

@Component({
  selector: 'app-counterview',
  templateUrl: './counterview.component.html',
  styleUrls: ['./counterview.component.css']
})
export class CounterviewComponent implements OnInit {

  counter$!: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.counter$ = this.store.select(fetchCountValue)
  }

}
