import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterviewComponent } from './counterview/counterview.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
import { COUNTER_STATE_NAME } from './store/counter.selector';


@NgModule({
  declarations: [
    CounterviewComponent,
    CounterButtonsComponent,
    CounterInputComponent
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ]
})
export class CounterModule { }
