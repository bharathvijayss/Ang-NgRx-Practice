import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { decrementCounter, incrementCounter, resetCounter } from '../store/counter.action';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  incrementCounter() {
    this.store.dispatch(incrementCounter());
  }

  resetCounter() {
    this.store.dispatch(resetCounter());
  }

  decrementCounter() {
    this.store.dispatch(decrementCounter());
  }

}
