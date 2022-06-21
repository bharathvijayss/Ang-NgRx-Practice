import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterviewComponent } from './counterview/counterview.component';

const routes: Routes = [{
  path:'',
  component: CounterviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterRoutingModule { }
